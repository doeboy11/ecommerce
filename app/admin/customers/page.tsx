'use client'

import { useState } from 'react'
import { mockUsers, mockOrders } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import CustomerDetailModal from '@/components/admin/customer-detail-modal'

export default function AdminCustomersPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)

  const customers = mockUsers.filter(u => u.role === 'customer')

  const getCustomerStats = (customerId: string) => {
    const orders = mockOrders.filter(o => o.userId === customerId)
    const totalSpent = orders.reduce((sum, o) => sum + o.total, 0)
    return {
      totalOrders: orders.length,
      totalSpent,
      lastOrder: orders.length > 0 ? new Date(orders[orders.length - 1].createdAt) : null,
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customers</h1>
        <p className="text-muted-foreground mt-1">Manage customer accounts and order history</p>
      </div>

      {customers.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-muted-foreground">No customers yet</p>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Customer</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Email</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Total Orders</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Total Spent</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Last Order</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Joined</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => {
                  const stats = getCustomerStats(customer.id)
                  return (
                    <tr key={customer.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-6 text-sm text-foreground font-medium">
                        {customer.firstName} {customer.lastName}
                      </td>
                      <td className="py-3 px-6 text-sm text-muted-foreground">{customer.email}</td>
                      <td className="py-3 px-6 text-sm text-foreground">{stats.totalOrders}</td>
                      <td className="py-3 px-6 text-sm text-foreground font-semibold">
                        ${stats.totalSpent.toFixed(2)}
                      </td>
                      <td className="py-3 px-6 text-sm text-muted-foreground">
                        {stats.lastOrder ? stats.lastOrder.toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-sm text-muted-foreground">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6 text-sm">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedCustomerId(customer.id)}
                          className="border-border hover:bg-secondary"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedCustomerId && (
        <CustomerDetailModal
          customerId={selectedCustomerId}
          onClose={() => setSelectedCustomerId(null)}
        />
      )}
    </div>
  )
}
