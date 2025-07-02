import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"
import Link from "next/link"

const featuredPlaces = [
  {
    id: 1,
    name: "Kurasu Coffee",
    category: "Cafe",
    rating: 4.8,
    reviews: 324,
    image: "/placeholder.svg?height=300&width=400",
    description: "Cozy Japanese-style coffee shop with minimalist interior and premium coffee beans.",
    location: "Kemang, Jakarta Selatan",
    trending: true,
  },
  {
    id: 2,
    name: "Lucky Cat",
    category: "Restaurant",
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=400",
    description: "Instagrammable Asian fusion restaurant with unique cat-themed decorations.",
    location: "Senopati, Jakarta Selatan",
    trending: true,
  },
  {
    id: 3,
    name: "Taman Langsat",
    category: "Park",
    rating: 4.4,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    description: "Hidden gem park perfect for outdoor hangouts and photoshoots.",
    location: "Kebayoran Baru, Jakarta Selatan",
    trending: false,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-light-gray via-white to-medium-gray">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Temukan Tempat <span className="text-dark-gray">Hangout Viral</span>
            <br />
            di Jakarta Selatan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Jelajahi tempat-tempat hangout terpopuler dan terbaru di Jakarta Selatan. Dari cafe aesthetic hingga
            restoran instagrammable, temukan semuanya di sini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/maps">
              <Button className="bg-dark-gray hover:bg-blue-gray text-white px-8 py-3 text-lg">Jelajahi Maps</Button>
            </Link>
            <Link href="/trending">
              <Button
                variant="outline"
                className="border-dark-gray text-dark-gray hover:bg-medium-gray px-8 py-3 text-lg bg-transparent"
              >
                Lihat Trending
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tempat Hangout Populer</h2>
            <p className="text-gray-600 text-lg">Pilihan terbaik berdasarkan rating dan review dari komunitas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlaces.map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img src={place.image || "/placeholder.svg"} alt={place.name} className="w-full h-48 object-cover" />
                  {place.trending && (
                    <Badge className="absolute top-3 left-3 bg-dark-gray text-white">🔥 Trending</Badge>
                  )}
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
                  <p className="text-gray-600 mb-4">{place.description}</p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{place.location}</span>
                  </div>
                  <Button className="w-full bg-dark-gray hover:bg-blue-gray text-white">Lihat Detail</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-dark-gray">150+</div>
              <div className="text-gray-600">Tempat Hangout</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-gray">5000+</div>
              <div className="text-gray-600">Review Pengguna</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-dark-gray">25+</div>
              <div className="text-gray-600">Area Jakarta Selatan</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
