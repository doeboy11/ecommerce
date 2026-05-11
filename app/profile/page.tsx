'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers'
import { profileSchema, type ProfileFormData } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockOrders } from '@/lib/mock-data'
import OrderHistoryModal from '@/components/profile/order-history-modal'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    country: user?.country || '',
    zipCode: user?.zipCode || '',
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Please log in</h1>
          <Button
            onClick={() => router.push('/login')}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  const userOrders = mockOrders.filter(order => order.userId === user.id)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSave = async () => {
    setErrors({})
    try {
      const validated = profileSchema.parse(formData)
      setIsSaving(true)
      await updateProfile(validated)
      setIsEditing(false)
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <p className="text-muted-foreground mt-1">Manage your profile and orders</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              logout()
              router.push('/')
            }}
            className="border-border hover:bg-secondary"
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-border hover:bg-secondary"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">First Name</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing || isLoading}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Last Name</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing || isLoading}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Email</label>
                  <Input value={user.email} disabled className="bg-muted" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Phone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing || isLoading}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Address</label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing || isLoading}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">City</label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!isEditing || isLoading}
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Country</label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      disabled={!isEditing || isLoading}
                      className={errors.country ? 'border-red-500' : ''}
                    />
                    {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Zip Code</label>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      disabled={!isEditing || isLoading}
                      className={errors.zipCode ? 'border-red-500' : ''}
                    />
                    {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                  </div>
                </div>

                {isEditing && (
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div>
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Account</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">{userOrders.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="text-sm font-medium text-foreground capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Order History</h2>
          {userOrders.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <p className="text-muted-foreground mb-4">No orders yet</p>
              <Button
                onClick={() => router.push('/shop/women')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-card rounded-lg border border-border p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      Status: <span className="font-medium text-foreground">{order.status}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">${order.total.toFixed(2)}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedOrderId(order.id)}
                      className="mt-2 border-border hover:bg-secondary"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedOrderId && (
        <OrderHistoryModal
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  )
}
