'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import Link from 'next/link'
import useCartStore, { CartItem } from '@/lib/hooks/useCartStore'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react'

interface Product {
  productId: string
  description: string
  categories: string[]
  items: Array<{
    price: {
      regular: number
    }
  }>
  images?: Array<{
    perspective: string
    sizes: Array<{
      size: string
      url: string
    }>
  }>
}

function ProductsContent() {
  const cart = useCartStore(state => state.cart)
  const addToCart = useCartStore(state => state.addToCart)
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
  const searchParams = useSearchParams()
  const search = searchParams.get('term')
  const [results, setResults] = useState<Product[]>([])

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      productId: product.productId,
      quantity: 1,
      description: product.description,
      items: product.items.map(item => ({
        price: { regular: item.price.regular },
        image: product.images?.[0]?.sizes.find(size => size.size === 'xlarge')
      }))
    }
    addToCart({ product: cartItem, quantity: 1 })
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?term=${search}`, {
          headers: {
            'Accept': 'application/json',
            'method': 'GET',
          },
        })
        const data: Product[] = await res.json()
        setResults(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchProducts()
  }, [search])

  useEffect(() => {
    setResults(prevResults => [...prevResults].sort((a, b) => {
      const priceA = a.items[0]?.price?.regular ?? 0
      const priceB = b.items[0]?.price?.regular ?? 0
      return sortOrder === 'ASC' ? priceA - priceB : priceB - priceA
    }))
  }, [sortOrder])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search results for &quot;{search}&quot;</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-muted-foreground">{results.length} products found</p>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
            className="flex items-center gap-2"
          >
            Sort by Price
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((product) => (
          <Card key={product.productId} className="flex flex-col">
            <Link href={`/products/${product.productId}`} className="flex-grow">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  alt={product.description}
                  src={product.images?.find(image => image.perspective === 'front')?.sizes.find(size => size.size === 'xlarge')?.url || '/placeholder.svg'}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg transition-transform duration-200 ease-in-out hover:scale-105"
                />
              </div>
            </Link>
            <CardContent className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <Link href={`/products/${product.productId}`} className="block">
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">{product.description}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-2">{product.categories[0]}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg">${product.items[0]?.price?.regular.toFixed(2) ?? 'Unavailable'}</span>
                <Button size="sm" onClick={() => handleAddToCart(product)}>Add To Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button size="sm" variant="outline">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Prev
        </Button>
        <Button size="sm" variant="outline">
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}