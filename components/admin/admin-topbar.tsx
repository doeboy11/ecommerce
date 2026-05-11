'use client'

import { useAuth } from '@/app/providers'
import { User } from 'lucide-react'

export function AdminTopbar() {
  const { user } = useAuth()

  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Welcome back, {user?.firstName}!</h2>
        <p className="text-sm text-muted-foreground">Manage your store and orders</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-lg">
          <User className="w-5 h-5 text-foreground" />
          <div className="text-sm">
            <p className="font-medium text-foreground">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
