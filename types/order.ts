import { CartItem } from './product'

export interface OrderItem extends CartItem {
  productName: string
}

export interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  zipCode: string
}

export interface BillingInfo extends ShippingInfo {}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  shippingInfo: ShippingInfo
  billingInfo: BillingInfo
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: string
  paymentStatus: 'pending' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
}
