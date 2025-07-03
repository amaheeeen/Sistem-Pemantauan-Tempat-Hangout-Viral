export interface FilterOptions {
  categories: string[]
  facilities: string[]
  viralityRange: [number, number]
  priceRange: [number, number]
  personalityTypes: string[]
}

export interface Place {
  id: number
  name: string
  category: string
  rating: number
  reviews: number
  image: string
  description: string
  location: string
  coordinates?: { lat: number; lng: number }
  trendScore?: number
  socialStats?: {
    instagram: number
    tiktok: number
    likes: number
  }
  trending?: "up" | "stable" | "down"
  facilities: string[]
  viralityScore: number
  priceRange: number // 1-4 ($ to $$$$)
  personalityMatch: string[] // ["Introvert", "Ekstrovert", "Ambivert"]
  openHours: string
  phoneNumber?: string
  website?: string
}

export interface RecommendationFilters {
  category?: string
  facilities?: string[]
  minViralityScore?: number
  maxViralityScore?: number
  minPrice?: number
  maxPrice?: number
  personalityType?: string
  location?: string
}
