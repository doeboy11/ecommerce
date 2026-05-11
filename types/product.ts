export type Category = 'women' | 'men' | 'kids'

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: Category
  images: string[]
  sizes: Size[]
  colors: string[]
  rating: number
  reviews: number
  inStock: boolean
  tags: string[]
}

export interface CartItem {
  productId: string
  quantity: number
  size: Size
  color: string
  price: number
}
