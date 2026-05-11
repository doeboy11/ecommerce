'use client'

import { mockOrders } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'

interface OrderHistoryModalProps {
  orderId: string
  onClose: () => void
}

export default function OrderHistoryModal({ orderId, onClose }: OrderHistoryModalProps) {
  const order = mockOrders.find(o => o.id === orderId)

  if (!order) {
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
          {/* Order Info */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Order Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-medium text-foreground">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium text-foreground capitalize">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <p className="font-medium text-foreground capitalize">{order.paymentStatus}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Items</h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                  <div>
                    <p className="font-medium text-foreground">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.size} / {item.color} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Shipping Address</h3>
            <div className="p-3 bg-secondary/10 rounded text-sm">
              <p className="text-foreground">
                {order.shippingInfo.firstName} {order.shippingInfo.lastName}
              </p>
              <p className="text-muted-foreground">{order.shippingInfo.address}</p>
              <p className="text-muted-foreground">
                {order.shippingInfo.city}, {order.shippingInfo.country} {order.shippingInfo.zipCode}
              </p>
              <p className="text-muted-foreground">{order.shippingInfo.phone}</p>
              <p className="text-muted-foreground">{order.shippingInfo.email}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-border pt-4">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
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
