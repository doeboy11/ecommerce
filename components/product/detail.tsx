'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Heart, Share2, Truck, RotateCcw, Lock } from 'lucide-react'
import { Product, Size } from '@/types/product'
import { cn } from '@/lib/utils'

interface ProductDetailProps {
  product: Product
  onAddToCart: (size: Size, color: string, quantity: number) => void
  isAdding: boolean
}

export function ProductDetail({ product, onAddToCart, isAdding }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(selectedSize, selectedColor, quantity)
      setQuantity(1)
      setSelectedSize(null)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Image Gallery */}
      <div className="flex flex-col-reverse gap-4">
        {/* Thumbnail Images */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {product.images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(idx)}
              className={cn(
                'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-300',
                mainImage === idx ? 'border-accent' : 'border-border'
              )}
            >
              <Image
                src={image}
                alt={`${product.name} view ${idx + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <Image
            src={product.images[mainImage]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold">
              -{discount}%
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn('w-5 h-5', i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted')}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-foreground/80 leading-relaxed mb-8">{product.description}</p>
        </div>

        {/* Selectors */}
        <div className="space-y-6 mb-8">
          {/* Color Selector */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Color</label>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                    selectedColor === color
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Size</label>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300',
                    selectedSize === size
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
            <div className="flex items-center border border-border rounded-lg w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
              >
                −
              </button>
              <span className="px-6 py-2 text-foreground font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || isAdding}
            className="flex-1 bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors duration-300"
          >
            <Heart className={cn('w-6 h-6', isWishlisted && 'fill-accent text-accent')} />
          </button>
          <button className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors duration-300">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Info Cards */}
        <div className="space-y-3 border-t border-border pt-8">
          <div className="flex items-center gap-3 text-sm">
            <Truck className="w-5 h-5 text-accent" />
            <span className="text-foreground">Free shipping on orders over $100</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <RotateCcw className="w-5 h-5 text-accent" />
            <span className="text-foreground">30-day easy returns</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Lock className="w-5 h-5 text-accent" />
            <span className="text-foreground">Secure checkout</span>
          </div>
        </div>
      </div>
    </div>
  )
}
