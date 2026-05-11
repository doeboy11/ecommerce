'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CartItem } from '@/types/product'
import { getProductById } from '@/lib/products'
import { useAuth } from '@/app/providers'
import { mockOrders } from '@/lib/mock-data'
import { Order } from '@/types/order'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  cardName: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

interface FormErrors {
  [key: string]: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: '',
    zip: user?.zipCode || '',
    country: user?.country || '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    const cart = localStorage.getItem('cart')
    const items = cart ? JSON.parse(cart) : []
    setCartItems(items)
    const count = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
    setCartCount(count)

    if (items.length === 0) {
      // Redirect to cart if empty
      window.location.href = '/cart'
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required'
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Valid phone number is required (10 digits)'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'
    if (!formData.zip.match(/^\d{3,}$/)) newErrors.zip = 'Valid ZIP code is required'
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required'
    if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = 'Valid card number is required (16 digits)'
    if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) newErrors.expiryDate = 'Valid expiry date is required (MM/YY)'
    if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.cvv = 'Valid CVV is required (3-4 digits)'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create order if user is authenticated
      if (user) {
        const newOrder: Order = {
          id: `order-${Date.now()}`,
          userId: user.id,
          items: cartItems.map(item => {
            const product = getProductById(item.productId)
            return {
              ...item,
              productName: product?.name || 'Unknown Product',
            }
          }),
          shippingInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            zipCode: formData.zip,
          },
          billingInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            zipCode: formData.zip,
          },
          subtotal,
          shippingCost: shipping,
          tax,
          total,
          status: 'processing',
          paymentMethod: 'credit_card',
          paymentStatus: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        mockOrders.push(newOrder)
      }

      // Clear cart and show success
      localStorage.setItem('cart', JSON.stringify([]))
      setOrderPlaced(true)
      setCartCount(0)
    } finally {
      setIsSubmitting(false)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (orderPlaced) {
    return (
      <>
        <Navbar cartCount={cartCount} />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
            <Link
              href="/"
              className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-300"
            >
              Continue Shopping
            </Link>
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
          <Link href="/cart" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </Link>

          <h1 className="text-4xl font-serif font-bold text-foreground mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="bg-card rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.firstName ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.lastName ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.email ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.phone ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.address ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.city ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.country ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.country && <p className="text-destructive text-sm mt-1">{errors.country}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="12345"
                      className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.zip ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.zip && <p className="text-destructive text-sm mt-1">{errors.zip}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Payment Information</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name *</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.cardName ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.cardName && <p className="text-destructive text-sm mt-1">{errors.cardName}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234567890123456"
                    maxLength={16}
                    className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.cardNumber ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.cardNumber && <p className="text-destructive text-sm mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Expiry Date *</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.expiryDate ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.expiryDate && <p className="text-destructive text-sm mt-1">{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={3}
                      className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.cvv ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.cvv && <p className="text-destructive text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-muted rounded-lg p-6 sticky top-20">
                <h2 className="text-lg font-semibold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => {
                    const product = getProductById(item.productId)
                    return (
                      <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3 text-sm">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{product?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <p className="text-foreground font-semibold">
                          {item.quantity}x ${item.price.toFixed(2)}
                        </p>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-border pt-6 space-y-3">
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
                  <div className="flex justify-between items-center text-lg border-t border-border pt-3">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-accent text-2xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
