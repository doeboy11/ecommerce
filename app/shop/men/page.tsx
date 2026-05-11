'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ShopLayout } from '@/components/shop/shop-layout'
import { getProductsByCategory } from '@/lib/products'

export default function MenPage() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const items = JSON.parse(cart)
      const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(count)
    }
  }, [])

  const products = getProductsByCategory('men')

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ShopLayout products={products} category="men" />
        </div>
      </main>
      <Footer />
    </>
  )
}
