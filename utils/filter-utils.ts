import type { Place, FilterOptions, RecommendationFilters } from "@/types/filters"

export function filterPlaces(places: Place[], filters: FilterOptions): Place[] {
  return places.filter((place) => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(place.category)) {
      return false
    }

    // Facilities filter
    if (filters.facilities.length > 0) {
      const hasRequiredFacilities = filters.facilities.every((facility) => place.facilities.includes(facility))
      if (!hasRequiredFacilities) return false
    }

    // Virality score range
    if (place.viralityScore < filters.viralityRange[0] || place.viralityScore > filters.viralityRange[1]) {
      return false
    }

    // Price range
    if (place.priceRange < filters.priceRange[0] || place.priceRange > filters.priceRange[1]) {
      return false
    }

    // Personality type filter
    if (filters.personalityTypes.length > 0) {
      const hasMatchingPersonality = filters.personalityTypes.some((type) => place.personalityMatch.includes(type))
      if (!hasMatchingPersonality) return false
    }

    return true
  })
}

export function getRecommendations(places: Place[], filters: RecommendationFilters, limit = 6): Place[] {
  let filteredPlaces = [...places]

  // Apply filters
  if (filters.category) {
    filteredPlaces = filteredPlaces.filter((place) => place.category === filters.category)
  }

  if (filters.facilities && filters.facilities.length > 0) {
    filteredPlaces = filteredPlaces.filter((place) =>
      filters.facilities!.every((facility) => place.facilities.includes(facility)),
    )
  }

  if (filters.minViralityScore !== undefined) {
    filteredPlaces = filteredPlaces.filter((place) => place.viralityScore >= filters.minViralityScore!)
  }

  if (filters.maxViralityScore !== undefined) {
    filteredPlaces = filteredPlaces.filter((place) => place.viralityScore <= filters.maxViralityScore!)
  }

  if (filters.minPrice !== undefined) {
    filteredPlaces = filteredPlaces.filter((place) => place.priceRange >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filteredPlaces = filteredPlaces.filter((place) => place.priceRange <= filters.maxPrice!)
  }

  if (filters.personalityType) {
    filteredPlaces = filteredPlaces.filter((place) => place.personalityMatch.includes(filters.personalityType!))
  }

  // Sort by virality score and rating
  filteredPlaces.sort((a, b) => {
    const scoreA = a.viralityScore * 0.6 + a.rating * 0.4
    const scoreB = b.viralityScore * 0.6 + b.rating * 0.4
    return scoreB - scoreA
  })

  return filteredPlaces.slice(0, limit)
}

export function getPriceLabel(priceRange: number): string {
  switch (priceRange) {
    case 1:
      return "$"
    case 2:
      return "$$"
    case 3:
      return "$$$"
    case 4:
      return "$$$$"
    default:
      return "$"
  }
}

export function getPersonalityColor(personality: string): string {
  switch (personality) {
    case "Introvert":
      return "bg-blue-100 text-blue-800"
    case "Ekstrovert":
      return "bg-red-100 text-red-800"
    case "Ambivert":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
