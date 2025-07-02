"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, MapPin, User } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Maps", href: "/maps" },
    { name: "Trending", href: "/trending" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-dark-gray rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-dark-gray font-bold">kalcer.id</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-gray transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="flex items-center space-x-2 bg-dark-gray text-light-gray px-4 py-2 rounded-lg hover:bg-blue-gray transition-all duration-200"
            >
              <User className="w-4 h-4" />
              <span>Masuk</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-gray transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-gray transition-colors duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 mx-3 my-2 bg-dark-gray text-light-gray px-4 py-2 rounded-lg hover:bg-blue-gray transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Masuk</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
