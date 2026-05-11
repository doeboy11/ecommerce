import { Product } from '@/types/product'

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Linen Blazer',
    description: 'Timeless linen blazer in natural beige. Perfect for layering or wearing as a statement piece.',
    price: 249,
    originalPrice: 299,
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Cream', 'Charcoal'],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    tags: ['blazer', 'linen', 'bestseller'],
  },
  {
    id: '2',
    name: 'Premium Silk Dress',
    description: 'Luxurious silk dress with elegant draping. Perfect for special occasions.',
    price: 399,
    originalPrice: 450,
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1595777707802-b0f0dcc49d8c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1550314472-5d440c26e8f5?w=600&h=600&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Gold', 'Burgundy'],
    rating: 4.9,
    reviews: 87,
    inStock: true,
    tags: ['dress', 'silk', 'evening'],
  },
  {
    id: '3',
    name: 'Wool Trousers',
    description: 'High-waisted wool trousers with a perfect fit. A wardrobe essential.',
    price: 189,
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534622066064-3a973dadca20?w=600&h=600&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Cream'],
    rating: 4.7,
    reviews: 156,
    inStock: true,
    tags: ['trousers', 'wool', 'classic'],
  },
  {
    id: '4',
    name: 'Oxford Cotton Shirt',
    description: 'Crisp oxford cotton shirt. Versatile and timeless piece for any wardrobe.',
    price: 129,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1596362051237-31cf5e4cd686?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598318479949-ac4fc32e8d01?w=600&h=600&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Cream'],
    rating: 4.6,
    reviews: 203,
    inStock: true,
    tags: ['shirt', 'oxford', 'classic'],
  },
  {
    id: '5',
    name: 'Tailored Wool Blazer',
    description: 'Premium tailored wool blazer. Structured and sophisticated.',
    price: 349,
    originalPrice: 399,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1540037404862-531218e53f31?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552062407-20ca94a7e2f3?w=600&h=600&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Charcoal', 'Black'],
    rating: 4.9,
    reviews: 98,
    inStock: true,
    tags: ['blazer', 'wool', 'tailored'],
  },
  {
    id: '6',
    name: 'Chino Trousers',
    description: 'Comfortable chino trousers in a modern fit. Great for casual or smart wear.',
    price: 99,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1473080169858-d0707b7b4a37?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584622650563-430f63602d4b?w=600&h=600&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Khaki', 'Gray', 'Navy'],
    rating: 4.5,
    reviews: 267,
    inStock: true,
    tags: ['trousers', 'chino', 'casual'],
  },
  {
    id: '7',
    name: 'Soft Cotton T-Shirt - Kids',
    description: 'Gentle and soft cotton t-shirt for kids. Perfect for everyday wear.',
    price: 39,
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1554873236-adf5b52203ce?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618886996285-50ec6a1706f2?w=600&h=600&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Navy', 'Beige'],
    rating: 4.8,
    reviews: 142,
    inStock: true,
    tags: ['t-shirt', 'kids', 'cotton'],
  },
  {
    id: '8',
    name: 'Wool Cardigan - Kids',
    description: 'Cozy wool cardigan for kids. Warm and comfortable for cooler days.',
    price: 69,
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1619451334792-150b6ca7b5a6?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1619389172950-5274c75eb199?w=600&h=600&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Gray', 'Cream', 'Navy'],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    tags: ['cardigan', 'kids', 'wool'],
  },
]

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  )
}
