"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MapPin, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Email wajib diisi")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Format email tidak valid")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light-gray via-white to-medium-gray flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Terkirim!</h2>
              <p className="text-gray-600 mb-6">
                Kami telah mengirimkan link reset password ke email <strong>{email}</strong>. Silakan cek inbox atau
                folder spam Anda.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Kirim Ulang Email
                </Button>
                <Link href="/auth/login">
                  <Button className="w-full bg-dark-gray hover:bg-blue-gray text-white">Kembali ke Login</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-gray via-white to-medium-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-dark-gray rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-dark-gray">kalcer.id</span>
          </Link>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">Lupa Password?</CardTitle>
            <p className="text-gray-600">Masukkan email Anda dan kami akan mengirimkan link untuk reset password</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    placeholder="nama@email.com"
                    className={`pl-10 ${error ? "border-red-500" : ""}`}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-dark-gray hover:bg-blue-gray text-white py-3"
              >
                {isLoading ? "Mengirim..." : "Kirim Link Reset"}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center pt-4 border-t border-gray-100">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-blue-gray hover:text-dark-gray font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Kembali ke Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
