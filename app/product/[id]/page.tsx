'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProductDetail } from '@/components/product/detail'
import { ProductCard } from '@/components/product/product-card'
import { getProductById, products } from '@/lib/products'
import { Size, CartItem } from '@/types/product'

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const product = getProductById(id)
  const [cartCount, setCartCount] = useState(0)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const items = JSON.parse(cart)
      const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(count)
    }
  }, [])

  const handleAddToCart = async (size: Size, color: string, quantity: number) => {
    setIsAdding(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item) => item.productId === id && item.size === size && item.color === color)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        productId: id,
        quantity,
        size,
        color,
        price: product!.price,
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    const newCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(newCount)
    setIsAdding(false)

    // Show toast notification (can be enhanced with a toast library)
    alert(`Added ${quantity} item(s) to cart!`)
  }

  if (!product) {
    return (
      <>
        <Navbar cartCount={cartCount} />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Product not found</h1>
            <p className="text-muted-foreground">The product you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ProductDetail product={product} onAddToCart={handleAddToCart} isAdding={isAdding} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 border-t border-border pt-20">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-12">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
