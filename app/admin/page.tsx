'use client'

import Link from 'next/link'
import { mockOrders, mockUsers } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { BarChart3, Package, ShoppingCart, Users } from 'lucide-react'

export default function AdminDashboard() {
  const totalProducts = 8
  const totalOrders = mockOrders.length
  const totalCustomers = mockUsers.filter(u => u.role === 'customer').length
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: BarChart3,
      color: 'bg-accent/10',
    },
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-blue-500/10',
    },
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-green-500/10',
    },
    {
      label: 'Total Customers',
      value: totalCustomers,
      icon: Users,
      color: 'bg-purple-500/10',
    },
  ]

  const recentOrders = mockOrders.slice(-5).reverse()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-card rounded-lg border border-border p-6">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
          <Link href="/admin/orders">
            <Button variant="outline" className="border-border hover:bg-secondary">
              View All
            </Button>
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => {
                  const customer = mockUsers.find(u => u.id === order.userId)
                  return (
                    <tr key={order.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-foreground font-medium">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {customer?.firstName} {customer?.lastName}
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground font-semibold">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          order.status === 'delivered'
                            ? 'bg-green-500/10 text-green-700'
                            : order.status === 'shipped'
                            ? 'bg-blue-500/10 text-blue-700'
                            : 'bg-yellow-500/10 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
