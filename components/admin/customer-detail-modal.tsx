'use client'

import { mockUsers, mockOrders } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'

interface CustomerDetailModalProps {
  customerId: string
  onClose: () => void
}

export default function CustomerDetailModal({ customerId, onClose }: CustomerDetailModalProps) {
  const customer = mockUsers.find(u => u.id === customerId)
  const orders = mockOrders.filter(o => o.userId === customerId)

  if (!customer) {
    return null
  }

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Customer Details</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">First Name</p>
              <p className="font-semibold text-foreground">{customer.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Name</p>
              <p className="font-semibold text-foreground">{customer.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold text-foreground">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-semibold text-foreground">{customer.phone || 'N/A'}</p>
            </div>
          </div>

          {/* Address Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Address</h3>
            <div className="bg-secondary/20 rounded-lg p-4 space-y-2 text-sm">
              <p className="text-foreground">{customer.address}</p>
              <p className="text-muted-foreground">
                {customer.city}, {customer.country} {customer.zipCode}
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Order Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-secondary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{orders.length}</p>
              </div>
              <div className="bg-secondary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-accent">${totalSpent.toFixed(2)}</p>
              </div>
              <div className="bg-secondary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                <p className="text-lg font-bold text-foreground">{new Date(customer.createdAt).getFullYear()}</p>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Order History</h3>
            {orders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No orders</p>
            ) : (
              <div className="space-y-3">
                {orders.slice(-5).reverse().map(order => (
                  <div key={order.id} className="flex justify-between items-start p-3 bg-secondary/20 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                    </div>
                    <p className="font-semibold text-foreground">${order.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
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
