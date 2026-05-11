'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { products } from '@/lib/products'

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const items = JSON.parse(cart)
      const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(count)
    }
  }, [])

  const categories = [
    {
      title: 'Women',
      href: '/shop/women',
      image: 'https://images.unsplash.com/photo-1490481651971-daf8afb6b470?w=800&h=800&fit=crop',
    },
    {
      title: 'Men',
      href: '/shop/men',
      image: 'https://images.unsplash.com/photo-1516826957519-c21cc028cb29?w=800&h=800&fit=crop',
    },
    {
      title: 'Kids',
      href: '/shop/kids',
      image: 'https://images.unsplash.com/photo-1503794073867-96f47a360e9f?w=800&h=800&fit=crop',
    },
  ]

  const featured = products.filter((p) => p.tags.includes('bestseller')).slice(0, 4)

  return (
    <>
      <Navbar cartCount={cartCount} />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance">
              Optimal Organization Meets Exquisite Design
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Discover curated luxury fashion that elevates your everyday.
            </p>
            <Link
              href="/shop/women"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Shop Now
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-serif font-bold text-center mb-12 text-foreground">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.href} href={category.href}>
                <div className="group relative h-64 rounded-lg overflow-hidden cursor-pointer">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <h3 className="text-3xl font-serif font-bold text-white">{category.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-muted/30 rounded-2xl margin-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground">Featured Collection</h2>
            <Link
              href="/shop/women"
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-semibold"
            >
              View All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Stay Updated</h2>
            <p className="mb-8 opacity-90 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive offers, new arrivals, and style tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground bg-primary-foreground/10 border border-primary-foreground/20 focus:outline-none focus:border-primary-foreground/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
