'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { getAllProducts } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import ProductFormModal from '@/components/admin/product-form-modal'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(getAllProducts())
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsEditing(false)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId))
    }
  }

  const handleSaveProduct = (product: Product) => {
    if (isEditing && selectedProduct) {
      setProducts(products.map(p => p.id === product.id ? product : p))
    } else {
      setProducts([...products, product])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <Button
          onClick={handleAddProduct}
          className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-muted-foreground mb-4">No products yet</p>
          <Button
            onClick={handleAddProduct}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Create First Product
          </Button>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Product</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Category</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Price</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Stock</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Rating</th>
                  <th className="text-left py-3 px-6 font-semibold text-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-6 text-sm text-foreground font-medium">{product.name}</td>
                    <td className="py-3 px-6 text-sm text-foreground capitalize">{product.category}</td>
                    <td className="py-3 px-6 text-sm text-foreground font-semibold">${product.price}</td>
                    <td className="py-3 px-6 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.inStock
                          ? 'bg-green-500/10 text-green-700'
                          : 'bg-red-500/10 text-red-700'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm text-foreground">{product.rating}⭐ ({product.reviews})</td>
                    <td className="py-3 px-6 text-sm space-x-2 flex">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProduct(product)}
                        className="border-border hover:bg-secondary"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="border-red-500/50 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <ProductFormModal
          product={isEditing ? selectedProduct : undefined}
          onSave={handleSaveProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
