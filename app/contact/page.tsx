"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Instagram, Twitter, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-gray via-white to-medium-gray">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hubungi <span className="text-dark-gray">Kami</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Punya pertanyaan, saran, atau ingin berkolaborasi? Kami siap mendengar dari kamu!
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Kirim Pesan</CardTitle>
                <p className="text-gray-600">Isi form di bawah ini dan kami akan merespons secepat mungkin</p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pesan Terkirim!</h3>
                    <p className="text-gray-600 mb-4">
                      Terima kasih telah menghubungi kami. Tim kami akan merespons dalam 24 jam.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Kirim Pesan Lain
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Lengkap *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="nama@email.com"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subjek *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subjek pesan"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Pesan *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tulis pesan kamu di sini..."
                        rows={6}
                        className="w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-dark-gray hover:bg-blue-gray text-white py-3"
                    >
                      {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-medium-gray rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-dark-gray" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600">hello@kalcer.id</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-medium-gray rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-dark-gray" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Telepon</div>
                    <div className="text-gray-600">+62 21 1234 5678</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-medium-gray rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-dark-gray" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Alamat</div>
                    <div className="text-gray-600">Jakarta Selatan, Indonesia</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Ikuti Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Instagram</div>
                      <div className="text-gray-600">@kalcer.id</div>
                    </div>
                  </a>

                  <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Twitter className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Twitter</div>
                      <div className="text-gray-600">@kalcerid</div>
                    </div>
                  </a>

                  <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">WhatsApp</div>
                      <div className="text-gray-600">+62 812 3456 7890</div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">FAQ Singkat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900 mb-1">Bagaimana cara submit tempat baru?</div>
                  <div className="text-sm text-gray-600">
                    Kamu bisa menghubungi kami melalui form atau email dengan detail tempat yang ingin ditambahkan.
                  </div>
                </div>

                <div>
                  <div className="font-medium text-gray-900 mb-1">Apakah gratis menggunakan Kalcer.ID?</div>
                  <div className="text-sm text-gray-600">
                    Ya, semua fitur Kalcer.ID gratis untuk digunakan oleh semua pengguna.
                  </div>
                </div>

                <div>
                  <div className="font-medium text-gray-900 mb-1">Berapa lama respons email?</div>
                  <div className="text-sm text-gray-600">
                    Kami berusaha merespons semua email dalam waktu 24 jam pada hari kerja.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
