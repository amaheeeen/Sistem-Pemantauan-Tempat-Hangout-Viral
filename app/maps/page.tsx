"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Search, Filter } from "lucide-react"

const mapPlaces = [
  {
    id: 1,
    name: "Kurasu Coffee",
    category: "Cafe",
    rating: 4.8,
    reviews: 324,
    image: "/placeholder.svg?height=200&width=300",
    description: "Cozy Japanese-style coffee shop",
    location: "Kemang, Jakarta Selatan",
    coordinates: { lat: -6.2615, lng: 106.8106 },
  },
  {
    id: 2,
    name: "Lucky Cat",
    category: "Restaurant",
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=200&width=300",
    description: "Asian fusion with cat theme",
    location: "Senopati, Jakarta Selatan",
    coordinates: { lat: -6.2297, lng: 106.8253 },
  },
  {
    id: 3,
    name: "Taman Langsat",
    category: "Park",
    rating: 4.4,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    description: "Hidden gem park for hangouts",
    location: "Kebayoran Baru, Jakarta Selatan",
    coordinates: { lat: -6.2383, lng: 106.7934 },
  },
]

const categories = ["All", "Cafe", "Restaurant", "Park", "Mall", "Bar"]

export default function MapsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlace, setSelectedPlace] = useState<(typeof mapPlaces)[0] | null>(null)

  const filteredPlaces = mapPlaces.filter((place) => {
    const matchesCategory = selectedCategory === "All" || place.category === selectedCategory
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
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

            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Filter className="w-5 h-5 text-gray-600 mr-2" />
                <span className="font-medium text-gray-900">Kategori</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-dark-gray text-light-gray"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
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
                        <div className="flex items-center text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="text-xs">{place.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
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
            <div className="absolute bottom-4 left-4 right-4 lg:right-auto lg:w-80">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-4">
                  <img
                    src={selectedPlace.image || "/placeholder.svg"}
                    alt={selectedPlace.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
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
                  <p className="text-gray-600 mb-3">{selectedPlace.description}</p>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{selectedPlace.location}</span>
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
