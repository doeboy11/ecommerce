'use client'

import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { CartItem, Product } from '@/types/product'
import { getProductById } from '@/lib/products'

interface CartItemComponentProps {
  item: CartItem
  onUpdateQuantity: (productId: string, quantity: number, size: string, color: string) => void
  onRemove: (productId: string, size: string, color: string) => void
}

export function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemComponentProps) {
  const product = getProductById(item.productId)

  if (!product) return null

  return (
    <div className="flex gap-4 py-6 border-b border-border">
      {/* Product Image */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{product.name}</h3>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <span>Color: {item.color}</span>
            <span>Size: {item.size}</span>
          </div>
        </div>

        {/* Quantity and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-border rounded-lg w-fit">
            <button
              onClick={() =>
                onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1), item.size, item.color)
              }
              className="px-3 py-1 text-foreground hover:bg-muted transition-colors"
            >
              −
            </button>
            <span className="px-4 py-1 text-foreground font-semibold">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1, item.size, item.color)}
              className="px-3 py-1 text-foreground hover:bg-muted transition-colors"
            >
              +
            </button>
          </div>
          <span className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.productId, item.size, item.color)}
        className="self-start p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        aria-label="Remove from cart"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
