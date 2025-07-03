"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import type { FilterOptions } from "@/types/filters"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"

interface FilterPanelProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  onClearFilters: () => void
}

const categories = ["All", "Cafe", "Restaurant", "Bar", "Food Court", "Park", "Mall"]
const facilities = [
  "WiFi",
  "AC",
  "Outdoor Seating",
  "Instagram Worthy",
  "Quiet",
  "Group Friendly",
  "Parking",
  "City View",
  "Romantic",
  "Live Music",
  "Cocktails",
  "VIP Area",
  "Books",
  "Study Area",
  "Power Outlets",
  "Variety Food",
  "Vintage Decor",
]
const personalityTypes = ["Introvert", "Ekstrovert", "Ambivert"]

export default function FilterPanel({ filters, onFiltersChange, onClearFilters }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "All") {
      onFiltersChange({
        ...filters,
        categories: checked ? [] : filters.categories,
      })
    } else {
      const newCategories = checked
        ? [...filters.categories, category]
        : filters.categories.filter((c) => c !== category)
      onFiltersChange({
        ...filters,
        categories: newCategories,
      })
    }
  }

  const handleFacilityChange = (facility: string, checked: boolean) => {
    const newFacilities = checked ? [...filters.facilities, facility] : filters.facilities.filter((f) => f !== facility)
    onFiltersChange({
      ...filters,
      facilities: newFacilities,
    })
  }

  const handlePersonalityChange = (personality: string, checked: boolean) => {
    const newPersonalities = checked
      ? [...filters.personalityTypes, personality]
      : filters.personalityTypes.filter((p) => p !== personality)
    onFiltersChange({
      ...filters,
      personalityTypes: newPersonalities,
    })
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.facilities.length > 0 ||
    filters.personalityTypes.length > 0 ||
    filters.viralityRange[0] > 0 ||
    filters.viralityRange[1] < 100 ||
    filters.priceRange[0] > 1 ||
    filters.priceRange[1] < 4

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Filter className="w-5 h-5 mr-2 text-dark-gray" />
            Filter & Rekomendasi
          </CardTitle>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={onClearFilters} className="text-xs bg-transparent">
                <X className="w-3 h-3 mr-1" />
                Clear
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="lg:hidden">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`space-y-6 ${!isExpanded ? "hidden lg:block" : ""}`}>
        {/* Categories */}
        <div>
          <h4 className="font-medium text-sm text-gray-900 mb-3">Kategori</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={category === "All" ? filters.categories.length === 0 : filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Virality Score Range */}
        <div>
          <h4 className="font-medium text-sm text-gray-900 mb-3">
            Skor Viralitas: {filters.viralityRange[0]} - {filters.viralityRange[1]}
          </h4>
          <Slider
            value={filters.viralityRange}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                viralityRange: value as [number, number],
              })
            }
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-sm text-gray-900 mb-3">
            Rentang Harga: {"$".repeat(filters.priceRange[0])} - {"$".repeat(filters.priceRange[1])}
          </h4>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                priceRange: value as [number, number],
              })
            }
            max={4}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Personality Types */}
        <div>
          <h4 className="font-medium text-sm text-gray-900 mb-3">Tipe Kepribadian</h4>
          <div className="space-y-2">
            {personalityTypes.map((personality) => (
              <div key={personality} className="flex items-center space-x-2">
                <Checkbox
                  id={`personality-${personality}`}
                  checked={filters.personalityTypes.includes(personality)}
                  onCheckedChange={(checked) => handlePersonalityChange(personality, checked as boolean)}
                />
                <label htmlFor={`personality-${personality}`} className="text-sm cursor-pointer">
                  {personality}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div>
          <h4 className="font-medium text-sm text-gray-900 mb-3">Fasilitas</h4>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {facilities.map((facility) => (
              <div key={facility} className="flex items-center space-x-2">
                <Checkbox
                  id={`facility-${facility}`}
                  checked={filters.facilities.includes(facility)}
                  onCheckedChange={(checked) => handleFacilityChange(facility, checked as boolean)}
                />
                <label htmlFor={`facility-${facility}`} className="text-xs cursor-pointer">
                  {facility}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div>
            <h4 className="font-medium text-sm text-gray-900 mb-3">Filter Aktif</h4>
            <div className="flex flex-wrap gap-1">
              {filters.categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
              {filters.facilities.map((facility) => (
                <Badge key={facility} variant="outline" className="text-xs">
                  {facility}
                </Badge>
              ))}
              {filters.personalityTypes.map((personality) => (
                <Badge key={personality} variant="default" className="text-xs bg-dark-gray">
                  {personality}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
