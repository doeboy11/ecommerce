'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CartItemComponent } from '@/components/cart/cart-item'
import { CartItem } from '@/types/product'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const cart = localStorage.getItem('cart')
    const items = cart ? JSON.parse(cart) : []
    setCartItems(items)
    const count = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
    setCartCount(count)
    setIsLoading(false)
  }, [])

  const handleUpdateQuantity = (productId: string, quantity: number, size: string, color: string) => {
    const updated = cartItems
      .map((item) =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
      .filter((item) => item.quantity > 0)

    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    const count = updated.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(count)
  }

  const handleRemove = (productId: string, size: string, color: string) => {
    const updated = cartItems.filter(
      (item) => !(item.productId === productId && item.size === size && item.color === color)
    )

    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    const count = updated.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(count)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (isLoading) {
    return (
      <>
        <Navbar cartCount={cartCount} />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading cart...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>

          <h1 className="text-4xl font-serif font-bold text-foreground mb-12">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart.</p>
              <Link
                href="/shop/women"
                className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-300"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 bg-card rounded-lg p-6">
                <div className="space-y-4">
                  {cartItems.map((item, idx) => (
                    <CartItemComponent
                      key={`${item.productId}-${item.size}-${item.color}-${idx}`}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-muted rounded-lg p-6 sticky top-20">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 border-b border-border pb-6">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Shipping</span>
                      <span className={`font-semibold ${shipping === 0 ? 'text-accent' : ''}`}>
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Tax</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6 text-lg">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-accent text-2xl">${total.toFixed(2)}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full bg-accent text-accent-foreground py-3 px-4 rounded-lg font-semibold text-center hover:bg-accent/90 transition-colors duration-300 mb-3"
                  >
                    Proceed to Checkout
                  </Link>

                  <button className="w-full bg-background text-foreground py-3 px-4 rounded-lg font-semibold border border-border hover:bg-muted transition-colors duration-300">
                    Continue Shopping
                  </button>

                  {subtotal <= 100 && (
                    <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg text-sm text-foreground">
                      <p className="font-semibold mb-2">Free shipping available!</p>
                      <p className="text-accent">Add ${(100 - subtotal).toFixed(2)} more to get free shipping.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
