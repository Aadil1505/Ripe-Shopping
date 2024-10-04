"use client"

import { useState, ChangeEvent, FormEvent } from 'react'
import { Upload, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import convertor1 from "@/lib/api/quickpick"
import useCartStore, { CartItem } from '@/lib/hooks/useCartStore'

interface Product {
  productId: string
  description: string
  items: Array<{
    price: { regular: number }
    image?: { url: string }
  }>
}

export default function QuickPickPage() {
  const [file, setFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('')
  const [added, setAdded] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const addToCart = useCartStore(state => state.addToCart)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const fetchProducts = async (term: string): Promise<Product[]> => {
    try {
      const res = await fetch(`/api/products?term=${term}`, {
        headers: {
          'Accept': 'application/json',
          'method': 'GET',
        },
      })
      const data: Product[] = await res.json()
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setAdded([])

    if (!file) {
      setError('Please select a file to upload.')
      setIsLoading(false)
      return
    }

    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string
        const items = await convertor1(base64Image)

        const products: Product[] = []

        for (const item of items) {
          const productResults = await fetchProducts(item)
          if (productResults.length > 0) {
            const product = productResults[0]
            products.push(product)
            
            const cartItem: CartItem = {
              productId: product.productId,
              quantity: 1,
              description: product.description,
              items: product.items
            }
            addToCart({ product: cartItem, quantity: 1 })
          }
        }

        setAdded(products)
        setIsLoading(false)
      }
      reader.readAsDataURL(file)
    } 
    catch (error) {
      setError((error as Error).message)
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">QuickPick Shopping List</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Drag and drop an image of a shopping list and we'll make your cart!
                </p>
                <a href='/quickpick-test.jpeg' download className="text-sm text-primary hover:underline">
                  Download Sample Image
                </a>
              </div>
              <div className="rounded-lg border-2 border-dashed border-input p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">
                    Drag and drop your image here
                  </p>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Or choose a file</Label>
                    <Input id="picture" type="file" onChange={handleFileChange} accept="image/*" />
                  </div>
                </div>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Image Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Uploaded Preview"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <p className="text-muted-foreground">No image uploaded yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-8">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {added.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2" />
              Added to Your Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {added.map((product, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-secondary rounded-md">
                  <span>{product.description}</span>
                  <span className="font-semibold">
                    ${product.items[0]?.price.regular.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
        </div>
      )}
    </div>
  )
}