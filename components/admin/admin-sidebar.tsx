'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Package, ShoppingCart, Users, LogOut } from 'lucide-react'
import { useAuth } from '@/app/providers'

const navItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: BarChart3,
  },
  {
    href: '/admin/products',
    label: 'Products',
    icon: Package,
  },
  {
    href: '/admin/orders',
    label: 'Orders',
    icon: ShoppingCart,
  },
  {
    href: '/admin/customers',
    label: 'Customers',
    icon: Users,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">LUXE</h1>
        <p className="text-sm text-muted-foreground">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => {
            logout()
            window.location.href = '/'
          }}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
