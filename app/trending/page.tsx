"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, MapPin, TrendingUp, Instagram, Heart, MessageCircle, Search, Phone, Globe, Clock } from "lucide-react"
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

export default function TrendingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  // Filter and search places, then sort by trend score
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

    // Sort by virality score for trending
    return places.sort((a, b) => b.viralityScore - a.viralityScore)
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
      6,
    )
  }, [filters])

  const handleClearFilters = () => {
    setFilters(initialFilters)
  }

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-gray via-white to-medium-gray">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-dark-gray mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Trending Now</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tempat hangout yang lagi viral di sosial media dan paling banyak dikunjungi berdasarkan data real-time dari
            Instagram dan TikTok
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Trending Up</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Stable</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Trending Down</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <div className="lg:col-span-1">
              <FilterPanel filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Cari tempat trending..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              {/* Recommendations */}
              <div className="mb-6">
                <RecommendationPanel recommendations={recommendations} onPlaceSelect={handlePlaceSelect} />
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Menampilkan {filteredPlaces.length} tempat trending dari {placesData.length} total
                </p>
              </div>

              {/* Trending Places Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlaces.map((place, index) => (
                  <Card
                    key={place.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => setSelectedPlace(place)}
                  >
                    <div className="relative">
                      <img
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3 flex items-center space-x-2">
                        <Badge className="bg-dark-gray text-white">#{index + 1} Trending</Badge>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            place.trending === "up"
                              ? "bg-green-500"
                              : place.trending === "stable"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        ></div>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-bold text-dark-gray">{place.viralityScore}</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{place.category}</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{place.rating}</span>
                          <span className="text-gray-500">({place.reviews})</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{place.description}</p>

                      <div className="flex items-center text-gray-500 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{place.location}</span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline">{getPriceLabel(place.priceRange)}</Badge>
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="text-xs">{place.openHours}</span>
                        </div>
                      </div>

                      {/* Personality Match */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Cocok untuk:</p>
                        <div className="flex flex-wrap gap-1">
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

                      {/* Facilities */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Fasilitas:</p>
                        <div className="flex flex-wrap gap-1">
                          {place.facilities.slice(0, 3).map((facility) => (
                            <Badge key={facility} variant="outline" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                          {place.facilities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{place.facilities.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Social Stats */}
                      {place.socialStats && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="text-xs text-gray-500 mb-2">Social Media Stats</div>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <Instagram className="w-4 h-4 text-pink-500 mr-1" />
                              <span>{place.socialStats.instagram}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 text-blue-500 mr-1" />
                              <span>{place.socialStats.tiktok}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 text-red-500 mr-1" />
                              <span>{place.socialStats.likes}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button className="w-full bg-dark-gray hover:bg-blue-gray text-white">Lihat di Maps</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPlaces.length === 0 && (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada tempat yang ditemukan</h3>
                  <p className="text-gray-500 mb-4">Coba ubah filter atau kata kunci pencarian Anda.</p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Place Modal/Detail */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedPlace.name}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPlace(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              <img
                src={selectedPlace.image || "/placeholder.svg"}
                alt={selectedPlace.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-sm">
                      {selectedPlace.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{selectedPlace.rating}</span>
                      <span className="text-gray-500">({selectedPlace.reviews} reviews)</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{selectedPlace.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3" />
                      <span>{selectedPlace.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3" />
                      <span>{selectedPlace.openHours}</span>
                    </div>

                    {selectedPlace.phoneNumber && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-5 h-5 mr-3" />
                        <span>{selectedPlace.phoneNumber}</span>
                      </div>
                    )}

                    {selectedPlace.website && (
                      <div className="flex items-center text-gray-600">
                        <Globe className="w-5 h-5 mr-3" />
                        <span>{selectedPlace.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {getPriceLabel(selectedPlace.priceRange)}
                    </Badge>
                    <span className="text-lg text-blue-gray font-bold">Viral Score: {selectedPlace.viralityScore}</span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cocok untuk:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlace.personalityMatch.map((personality) => (
                        <Badge key={personality} className={`${getPersonalityColor(personality)}`} variant="secondary">
                          {personality}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Fasilitas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlace.facilities.map((facility) => (
                        <Badge key={facility} variant="outline" className="text-sm">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedPlace.socialStats && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Social Media Stats</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Instagram className="w-5 h-5 text-pink-500 mr-2" />
                            <span>Instagram</span>
                          </div>
                          <span className="font-semibold">{selectedPlace.socialStats.instagram}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MessageCircle className="w-5 h-5 text-blue-500 mr-2" />
                            <span>TikTok</span>
                          </div>
                          <span className="font-semibold">{selectedPlace.socialStats.tiktok}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Heart className="w-5 h-5 text-red-500 mr-2" />
                            <span>Total Likes</span>
                          </div>
                          <span className="font-semibold">{selectedPlace.socialStats.likes}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <Button className="flex-1 bg-dark-gray hover:bg-blue-gray text-white">Lihat di Maps</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Bagikan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Punya Rekomendasi Tempat Hangout?</h2>
          <p className="text-gray-600 mb-8">Bantu komunitas dengan berbagi tempat hangout viral yang kamu temukan!</p>
          <Button className="bg-dark-gray hover:bg-blue-gray text-white px-8 py-3 text-lg">Submit Tempat Baru</Button>
        </div>
      </section>
    </div>
  )
}
