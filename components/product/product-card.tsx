'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'
import { Product } from '@/types/product'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-muted aspect-square mb-4">
          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
            <Image
              src={product.images[imageIndex] || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
              -{discount}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-4 left-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors duration-300"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-300 ${
                isWishlisted ? 'fill-accent text-accent' : 'text-foreground'
              }`}
            />
          </button>

          {/* Image Indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault()
                    setImageIndex(idx)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    idx === imageIndex ? 'bg-accent' : 'bg-background/50'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300 text-balance">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          {/* Stock Status */}
          <div className="text-xs font-medium">
            {product.inStock ? (
              <span className="text-accent">In Stock</span>
            ) : (
              <span className="text-destructive">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
