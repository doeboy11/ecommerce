'use client'

import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { Product, Category } from '@/types/product'
import { ProductCard } from '@/components/product/product-card'

interface ShopLayoutProps {
  products: Product[]
  category: Category
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular'

export function ShopLayout({ products, category }: ShopLayoutProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])

  // Extract unique sizes and colors from products
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)))
  const allColors = Array.from(new Set(products.flatMap((p) => p.colors)))

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.some((s) => p.sizes.includes(s as any))
      const colorMatch = selectedColors.length === 0 || selectedColors.some((c) => p.colors.includes(c))
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1]
      return sizeMatch && colorMatch && priceMatch
    })

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews)
        break
      case 'newest':
      default:
        // Keep original order
        break
    }

    return result
  }, [products, sortBy, selectedSizes, selectedColors, priceRange])

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  return (
    <div className="flex gap-8">
      {/* Sidebar Filters */}
      <aside className="hidden lg:w-64 lg:flex lg:flex-col">
        <div className="space-y-8">
          {/* Sort */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Sort By</h3>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg appearance-none text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Price Range</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-accent"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Sizes</h3>
            <div className="space-y-2">
              {allSizes.map((size) => (
                <label key={size} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                    className="w-4 h-4 accent-accent rounded"
                  />
                  <span className="text-sm text-foreground">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Colors</h3>
            <div className="space-y-2">
              {allColors.map((color) => (
                <label key={color} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                    className="w-4 h-4 accent-accent rounded"
                  />
                  <span className="text-sm text-foreground">{color}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-foreground capitalize">
            {category} Collection
          </h2>
          <p className="text-sm text-muted-foreground">{filteredProducts.length} items</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
