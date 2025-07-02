import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, TrendingUp, Instagram, Heart, MessageCircle } from "lucide-react"

const trendingPlaces = [
  {
    id: 1,
    name: "Kurasu Coffee",
    category: "Cafe",
    rating: 4.8,
    reviews: 324,
    image: "/placeholder.svg?height=300&width=400",
    description: "Japanese-style coffee shop yang lagi viral di TikTok dengan interior minimalis dan kopi premium.",
    location: "Kemang, Jakarta Selatan",
    trendScore: 95,
    socialStats: {
      instagram: 1250,
      tiktok: 890,
      likes: 2140,
    },
    trending: "up",
  },
  {
    id: 2,
    name: "Lucky Cat",
    category: "Restaurant",
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=400",
    description: "Asian fusion restaurant dengan dekorasi kucing yang instagrammable banget!",
    location: "Senopati, Jakarta Selatan",
    trendScore: 88,
    socialStats: {
      instagram: 980,
      tiktok: 650,
      likes: 1630,
    },
    trending: "up",
  },
  {
    id: 3,
    name: "Rooftop Garden Cafe",
    category: "Cafe",
    rating: 4.7,
    reviews: 267,
    image: "/placeholder.svg?height=300&width=400",
    description: "Cafe rooftop dengan view city skyline yang perfect untuk sunset photos.",
    location: "Blok M, Jakarta Selatan",
    trendScore: 82,
    socialStats: {
      instagram: 756,
      tiktok: 420,
      likes: 1176,
    },
    trending: "up",
  },
  {
    id: 4,
    name: "Neon Night Market",
    category: "Food Court",
    rating: 4.5,
    reviews: 445,
    image: "/placeholder.svg?height=300&width=400",
    description: "Food court dengan konsep neon aesthetic yang hits di kalangan Gen Z.",
    location: "Pondok Indah, Jakarta Selatan",
    trendScore: 79,
    socialStats: {
      instagram: 634,
      tiktok: 380,
      likes: 1014,
    },
    trending: "stable",
  },
  {
    id: 5,
    name: "Secret Garden Bar",
    category: "Bar",
    rating: 4.4,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    description: "Hidden bar dengan konsep garden yang cozy untuk hangout malam.",
    location: "Kemang, Jakarta Selatan",
    trendScore: 75,
    socialStats: {
      instagram: 445,
      tiktok: 290,
      likes: 735,
    },
    trending: "down",
  },
  {
    id: 6,
    name: "Vintage Vinyl Cafe",
    category: "Cafe",
    rating: 4.3,
    reviews: 198,
    image: "/placeholder.svg?height=300&width=400",
    description: "Cafe dengan koleksi vinyl records dan vibe retro yang unik.",
    location: "Cipete, Jakarta Selatan",
    trendScore: 71,
    socialStats: {
      instagram: 389,
      tiktok: 210,
      likes: 599,
    },
    trending: "stable",
  },
]

export default function TrendingPage() {
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

      {/* Trending Places */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingPlaces.map((place, index) => (
              <Card
                key={place.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img src={place.image || "/placeholder.svg"} alt={place.name} className="w-full h-48 object-cover" />
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
                    <span className="text-sm font-bold text-dark-gray">{place.trendScore}</span>
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
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{place.location}</span>
                  </div>

                  {/* Social Stats */}
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

                  <Button className="w-full bg-dark-gray hover:bg-blue-gray text-white">Lihat di Maps</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
