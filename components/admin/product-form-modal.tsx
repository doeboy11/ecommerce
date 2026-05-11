'use client'

import { useState } from 'react'
import { Product, Category, Size } from '@/types/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const CATEGORIES: Category[] = ['women', 'men', 'kids']
const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const COLORS = ['Black', 'White', 'Blue', 'Red', 'Green', 'Purple', 'Gray', 'Brown', 'Navy', 'Beige']

interface ProductFormModalProps {
  product?: Product
  onSave: (product: Product) => void
  onClose: () => void
}

export default function ProductFormModal({ product, onSave, onClose }: ProductFormModalProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: `prod-${Date.now()}`,
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: 'women',
      images: [],
      sizes: [],
      colors: [],
      rating: 4.5,
      reviews: 0,
      inStock: true,
      tags: [],
    }
  )

  const [selectedSizes, setSelectedSizes] = useState<Set<Size>>(new Set(formData.sizes))
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set(formData.colors))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' || name === 'rating' || name === 'reviews'
        ? parseFloat(value)
        : name === 'inStock'
        ? (e.target as HTMLInputElement).checked
        : value,
    }))
  }

  const toggleSize = (size: Size) => {
    const newSizes = new Set(selectedSizes)
    if (newSizes.has(size)) {
      newSizes.delete(size)
    } else {
      newSizes.add(size)
    }
    setSelectedSizes(newSizes)
    setFormData(prev => ({ ...prev, sizes: Array.from(newSizes) }))
  }

  const toggleColor = (color: string) => {
    const newColors = new Set(selectedColors)
    if (newColors.has(color)) {
      newColors.delete(color)
    } else {
      newColors.add(color)
    }
    setSelectedColors(newColors)
    setFormData(prev => ({ ...prev, colors: Array.from(newColors) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.description && selectedSizes.size > 0 && selectedColors.size > 0) {
      onSave(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Product Name *</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Price *</label>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Original Price</label>
              <Input
                name="originalPrice"
                type="number"
                value={formData.originalPrice || ''}
                onChange={handleChange}
                step="0.01"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Rating</label>
              <Input
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Available Sizes *</label>
            <div className="grid grid-cols-6 gap-2">
              {SIZES.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`py-2 rounded border text-sm font-medium transition-colors ${
                    selectedSizes.has(size)
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border bg-background text-foreground hover:bg-secondary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Available Colors *</label>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggleColor(color)}
                  className={`py-2 rounded border text-sm font-medium transition-colors ${
                    selectedColors.has(color)
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border bg-background text-foreground hover:bg-secondary'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="rounded"
            />
            <label htmlFor="inStock" className="text-sm font-medium text-foreground">
              In Stock
            </label>
          </div>

          <div className="flex gap-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
