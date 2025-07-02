"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { User, Mail, Phone, Calendar, MapPin, Settings, LogOut, Camera } from "lucide-react"

export default function ProfilePage() {
  const { user, logout, updateProfile, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      await updateProfile(formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light-gray via-white to-medium-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Akses Ditolak</h2>
          <p className="text-gray-600 mb-6">Silakan login untuk mengakses halaman profil</p>
          <Button
            onClick={() => (window.location.href = "/auth/login")}
            className="bg-dark-gray hover:bg-blue-gray text-white"
          >
            Login Sekarang
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-gray via-white to-medium-gray py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <img
                    src={user.avatar || "/placeholder.svg?height=120&width=120"}
                    alt={user.fullName}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                  <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-8 h-8 bg-dark-gray rounded-full flex items-center justify-center text-white hover:bg-blue-gray transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user.fullName}</h2>
                <p className="text-gray-600 mb-3">{user.email}</p>
                <div className="flex justify-center mb-4">
                  <Badge variant={user.isVerified ? "default" : "secondary"} className="bg-green-100 text-green-800">
                    {user.isVerified ? "Terverifikasi" : "Belum Terverifikasi"}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Bergabung {new Date(user.createdAt).toLocaleDateString("id-ID")}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Jakarta Selatan</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Pengaturan Akun
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Informasi Pribadi</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isEditing) {
                      handleSave()
                    } else {
                      setIsEditing(true)
                    }
                  }}
                  disabled={isLoading}
                >
                  {isEditing ? "Simpan" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    {isEditing ? (
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama lengkap"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <span>{user.fullName}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Masukkan nomor telepon"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <span>{user.phone || "Belum diisi"}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status Akun</label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Badge
                        variant={user.isVerified ? "default" : "secondary"}
                        className="bg-green-100 text-green-800"
                      >
                        {user.isVerified ? "Terverifikasi" : "Belum Terverifikasi"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Stats */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Statistik Aktivitas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-medium-gray rounded-lg">
                    <div className="text-2xl font-bold text-dark-gray">12</div>
                    <div className="text-sm text-gray-600">Tempat Dikunjungi</div>
                  </div>
                  <div className="p-4 bg-light-gray rounded-lg">
                    <div className="text-2xl font-bold text-blue-gray">8</div>
                    <div className="text-sm text-gray-600">Review Ditulis</div>
                  </div>
                  <div className="p-4 bg-medium-gray rounded-lg">
                    <div className="text-2xl font-bold text-dark-gray">25</div>
                    <div className="text-sm text-gray-600">Foto Dibagikan</div>
                  </div>
                  <div className="p-4 bg-light-gray rounded-lg">
                    <div className="text-2xl font-bold text-blue-gray">156</div>
                    <div className="text-sm text-gray-600">Poin Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Aktivitas Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-medium-gray rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-dark-gray" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Mengunjungi Kurasu Coffee</p>
                      <p className="text-sm text-gray-600">2 hari yang lalu</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-light-gray rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-gray" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Menulis review untuk Lucky Cat</p>
                      <p className="text-sm text-gray-600">5 hari yang lalu</p>
                    </div>
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
