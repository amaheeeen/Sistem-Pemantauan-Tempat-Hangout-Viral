import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Heart, Target } from "lucide-react"

const teamMembers = [
  {
    name: "Alex Rahman",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=200&width=200",
    description: "Passionate about connecting people with amazing places in Jakarta Selatan.",
  },
  {
    name: "Sarah Putri",
    role: "Head of Community",
    image: "/placeholder.svg?height=200&width=200",
    description: "Building vibrant communities around shared experiences and discoveries.",
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    image: "/placeholder.svg?height=200&width=200",
    description: "Creating seamless digital experiences for urban explorers.",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-light-gray via-white to-medium-gray min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-dark-gray rounded-2xl flex items-center justify-center mr-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              About <span className="text-dark-gray">Kalcer.ID</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Kami adalah platform yang menghubungkan anak muda Jakarta Selatan dengan tempat-tempat hangout terbaik dan
            terviral di area mereka. Dari cafe aesthetic hingga restoran instagrammable, kami membantu kamu menemukan
            pengalaman baru yang tak terlupakan.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-dark-gray rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Misi Kami</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi platform terdepan yang membantu generasi muda Jakarta Selatan menemukan dan berbagi pengalaman
                  hangout terbaik. Kami berkomitmen untuk menciptakan komunitas yang aktif dalam mengeksplorasi
                  keindahan dan keunikan tempat-tempat di Jakarta Selatan.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-dark-gray rounded-lg flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Visi Kami</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi jembatan yang menghubungkan komunitas dengan tempat-tempat menakjubkan di Jakarta Selatan,
                  menciptakan pengalaman sosial yang bermakna, dan mendukung pertumbuhan ekonomi lokal melalui promosi
                  bisnis-bisnis unik di area ini.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-gray-600 text-lg">Prinsip-prinsip yang memandu setiap langkah kami</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-dark-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-600">
                Kami mengutamakan kepentingan komunitas dan membangun platform berdasarkan feedback dan kebutuhan
                pengguna.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dark-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Experiences</h3>
              <p className="text-gray-600">
                Kami hanya merekomendasikan tempat-tempat yang benar-benar memberikan pengalaman autentik dan
                berkualitas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dark-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local Focus</h3>
              <p className="text-gray-600">
                Kami berkomitmen untuk mendukung dan mempromosikan bisnis lokal di Jakarta Selatan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Kami</h2>
            <p className="text-gray-600 text-lg">Orang-orang passionate di balik Kalcer.ID</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pencapaian Kami</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-dark-gray">150+</div>
              <div className="text-gray-600">Tempat Hangout</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-gray">5000+</div>
              <div className="text-gray-600">Pengguna Aktif</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-dark-gray">25+</div>
              <div className="text-gray-600">Area Tercakup</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-gray">10K+</div>
              <div className="text-gray-600">Review & Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
