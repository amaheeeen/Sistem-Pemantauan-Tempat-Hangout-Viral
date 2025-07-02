import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail, Github, Twitter } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Logo/Brand Mark */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>

          {/* Headlines */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Subscribe to Our Newsletter</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get the latest updates, exclusive content, and insider tips delivered straight to your inbox every week.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Sign-up Options */}
          <div className="space-y-3">
            <p className="text-sm text-gray-500 text-center">Sign up with</p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full bg-transparent">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
            >
              Subscribe Now
            </Button>
          </form>

          {/* Additional Links */}
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <a href="#" className="hover:text-purple-600 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Help
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>We respect your privacy. Unsubscribe at any time.</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
