'use client'

import { mockOrders, mockUsers } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'

interface OrderDetailModalProps {
  orderId: string
  onClose: () => void
}

export default function OrderDetailModal({ orderId, onClose }: OrderDetailModalProps) {
  const order = mockOrders.find(o => o.id === orderId)
  const customer = order ? mockUsers.find(u => u.id === order.userId) : null

  if (!order || !customer) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Order Details</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Header */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-semibold text-foreground">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold text-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-semibold text-foreground capitalize">{order.status}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <p className="font-semibold text-foreground capitalize">{order.paymentStatus}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Customer Information</h3>
            <div className="bg-secondary/20 rounded-lg p-4 space-y-2">
              <p className="text-sm text-foreground">
                {customer.firstName} {customer.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{customer.email}</p>
              <p className="text-sm text-muted-foreground">{customer.phone}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Shipping Address</h3>
            <div className="bg-secondary/20 rounded-lg p-4 space-y-2">
              <p className="text-sm text-foreground">
                {order.shippingInfo.firstName} {order.shippingInfo.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{order.shippingInfo.address}</p>
              <p className="text-sm text-muted-foreground">
                {order.shippingInfo.city}, {order.shippingInfo.country} {order.shippingInfo.zipCode}
              </p>
              <p className="text-sm text-muted-foreground">{order.shippingInfo.phone}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Order Items</h3>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.size} / {item.color} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-border pt-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground font-medium">${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground font-medium">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2 mt-2">
                <span>Total</span>
                <span className="text-accent">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border p-6">
          <Button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
