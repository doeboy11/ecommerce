'use client'

import { useState } from 'react'
import { mockOrders, mockUsers } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import OrderDetailModal from '@/components/admin/order-detail-modal'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(o => o.status === statusFilter)

  const handleStatusUpdate = (orderId: string, newStatus: any) => {
    setOrders(orders.map(o =>
      o.id === orderId
        ? { ...o, status: newStatus, updatedAt: new Date() }
        : o
    ))
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage and track customer orders</p>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 flex-wrap">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === status
                ? 'bg-accent text-accent-foreground'
                : 'border border-border text-foreground hover:bg-secondary'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-muted-foreground">No orders found</p>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Order ID</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Customer</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Items</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Amount</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Status</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Date</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const customer = mockUsers.find(u => u.id === order.userId)
                  return (
                    <tr key={order.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-6 text-sm text-foreground font-medium">{order.id}</td>
                      <td className="py-3 px-6 text-sm text-foreground">
                        {customer?.firstName} {customer?.lastName}
                      </td>
                      <td className="py-3 px-6 text-sm text-foreground">{order.items.length} items</td>
                      <td className="py-3 px-6 text-sm text-foreground font-semibold">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-6 text-sm">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className={`px-3 py-1 rounded border text-xs font-medium capitalize ${
                            order.status === 'delivered'
                              ? 'bg-green-500/10 text-green-700 border-green-500/30'
                              : order.status === 'shipped'
                              ? 'bg-blue-500/10 text-blue-700 border-blue-500/30'
                              : order.status === 'cancelled'
                              ? 'bg-red-500/10 text-red-700 border-red-500/30'
                              : 'bg-yellow-500/10 text-yellow-700 border-yellow-500/30'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-6 text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6 text-sm">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOrderId(order.id)}
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

      {selectedOrderId && (
        <OrderDetailModal
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  )
}
