"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Lightbulb } from "lucide-react"
import type { Place } from "@/types/filters"
import { getPriceLabel, getPersonalityColor } from "@/utils/filter-utils"

interface RecommendationPanelProps {
  recommendations: Place[]
  onPlaceSelect?: (place: Place) => void
}

export default function RecommendationPanel({ recommendations, onPlaceSelect }: RecommendationPanelProps) {
  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Lightbulb className="w-5 h-5 mr-2 text-dark-gray" />
            Rekomendasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">Tidak ada rekomendasi berdasarkan filter yang dipilih.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Lightbulb className="w-5 h-5 mr-2 text-dark-gray" />
          Rekomendasi untuk Anda
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((place) => (
            <div
              key={place.id}
              className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onPlaceSelect?.(place)}
            >
              <div className="flex space-x-3">
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm text-gray-900 truncate">{place.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{place.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {place.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getPriceLabel(place.priceRange)}
                    </Badge>
                    <span className="text-xs text-blue-gray font-medium">Viral: {place.viralityScore}</span>
                  </div>

                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="text-xs truncate">{place.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {place.personalityMatch.slice(0, 2).map((personality) => (
                      <Badge
                        key={personality}
                        className={`text-xs ${getPersonalityColor(personality)}`}
                        variant="secondary"
                      >
                        {personality}
                      </Badge>
                    ))}
                  </div>

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
              </div>
            </div>
          ))}
        </div>

        {recommendations.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-500 text-center">
              Rekomendasi berdasarkan preferensi dan filter yang dipilih
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
