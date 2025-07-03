"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Search, Phone, Globe, Clock } from "lucide-react"
import type { FilterOptions, Place } from "@/types/filters"
import { filterPlaces, getRecommendations, getPriceLabel, getPersonalityColor } from "@/utils/filter-utils"
import { placesData } from "@/data/places-data"
import FilterPanel from "@/components/filter-panel"
import RecommendationPanel from "@/components/recommendation-panel"

const initialFilters: FilterOptions = {
  categories: [],
  facilities: [],
  viralityRange: [0, 100],
  priceRange: [1, 4],
  personalityTypes: [],
}

export default function MapsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)

  // Filter and search places
  const filteredPlaces = useMemo(() => {
    let places = filterPlaces(placesData, filters)

    if (searchQuery) {
      places = places.filter(
        (place) =>
          place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return places
  }, [filters, searchQuery])

  // Get recommendations based on current filters
  const recommendations = useMemo(() => {
    return getRecommendations(
      placesData,
      {
        category: filters.categories[0],
        facilities: filters.facilities,
        minViralityScore: filters.viralityRange[0],
        maxViralityScore: filters.viralityRange[1],
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        personalityType: filters.personalityTypes[0],
      },
      4,
    )
  }, [filters])

  const handleClearFilters = () => {
    setFilters(initialFilters)
  }

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place)
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="flex flex-col xl:flex-row h-screen">
        {/* Sidebar */}
        <div className="w-full xl:w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Maps Hangout Spots</h1>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Cari tempat hangout..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Panel */}
            <div className="mb-6">
              <FilterPanel filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} />
            </div>

            {/* Recommendation Panel */}
            <div className="mb-6">
              <RecommendationPanel recommendations={recommendations} onPlaceSelect={handlePlaceSelect} />
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Menampilkan {filteredPlaces.length} tempat dari {placesData.length} total
              </p>
            </div>

            {/* Places List */}
            <div className="space-y-4">
              {filteredPlaces.map((place) => (
                <Card
                  key={place.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedPlace?.id === place.id ? "ring-2 ring-blue-gray" : ""
                  }`}
                  onClick={() => setSelectedPlace(place)}
                >
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <img
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {place.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{place.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{place.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{place.description}</p>

                        <div className="flex items-center text-gray-500 mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="text-xs">{place.location}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {getPriceLabel(place.priceRange)}
                            </Badge>
                            <span className="text-xs text-blue-gray font-medium">Viral: {place.viralityScore}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {place.personalityMatch.map((personality) => (
                            <Badge
                              key={personality}
                              className={`text-xs ${getPersonalityColor(personality)}`}
                              variant="secondary"
                            >
                              {personality}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredPlaces.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Tidak ada tempat yang sesuai dengan filter yang dipilih.</p>
                  <Button variant="outline" onClick={handleClearFilters} className="mt-4 bg-transparent">
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <div className="w-full h-full bg-gradient-to-br from-medium-gray to-light-gray flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-dark-gray mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h3>
              <p className="text-gray-600 mb-4">Peta interaktif akan ditampilkan di sini menggunakan Google Maps API</p>
              <div className="bg-white p-4 rounded-lg shadow-md max-w-sm mx-auto">
                <p className="text-sm text-gray-500">Fitur yang akan tersedia:</p>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>• Pin lokasi hangout spots</li>
                  <li>• Detail popup untuk setiap lokasi</li>
                  <li>• Navigasi ke lokasi</li>
                  <li>• Filter berdasarkan kategori</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Selected Place Detail */}
          {selectedPlace && (
            <div className="absolute bottom-4 left-4 right-4 xl:right-auto xl:w-96">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-4">
                  <img
                    src={selectedPlace.image || "/placeholder.svg"}
                    alt={selectedPlace.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />

                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{selectedPlace.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{selectedPlace.rating}</span>
                      <span className="text-gray-500">({selectedPlace.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedPlace.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{selectedPlace.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{selectedPlace.location}</span>
                    </div>

                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{selectedPlace.openHours}</span>
                    </div>

                    {selectedPlace.phoneNumber && (
                      <div className="flex items-center text-gray-500">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{selectedPlace.phoneNumber}</span>
                      </div>
                    )}

                    {selectedPlace.website && (
                      <div className="flex items-center text-gray-500">
                        <Globe className="w-4 h-4 mr-2" />
                        <span className="text-sm">{selectedPlace.website}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{getPriceLabel(selectedPlace.priceRange)}</Badge>
                    <span className="text-sm text-blue-gray font-medium">
                      Viral Score: {selectedPlace.viralityScore}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Cocok untuk:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedPlace.personalityMatch.map((personality) => (
                        <Badge
                          key={personality}
                          className={`text-xs ${getPersonalityColor(personality)}`}
                          variant="secondary"
                        >
                          {personality}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Fasilitas:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedPlace.facilities.slice(0, 4).map((facility) => (
                        <Badge key={facility} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                      {selectedPlace.facilities.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{selectedPlace.facilities.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button className="w-full bg-dark-gray hover:bg-blue-gray text-white">Navigasi ke Lokasi</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
