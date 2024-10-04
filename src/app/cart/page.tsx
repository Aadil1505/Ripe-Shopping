"use client"

import { useState } from "react"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import useCartStore from "@/lib/hooks/useCartStore"
import { Trash2, CreditCard, Calendar, Lock, User, Loader2, ShoppingBag, ArrowLeft, Minus, Plus } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Image from "next/image"

export default function ResponsiveCartPage() {
  const { cart, setCartQuantity, removeFromCart, clearCart, cartTotal, totalItems } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { user } = useKindeBrowserClient()

  const taxRate = 0.08625
  const taxAmount = (cartTotal * taxRate).toFixed(2)
  const taxedTotal = (cartTotal * (1 + taxRate)).toFixed(2)

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId)
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartQuantity({ productId, quantity: newQuantity })
    }
  }

  const performCheckout = async () => {
    setIsLoading(true)
    setError("")
    try {
      const items = cart.map(({ productId, quantity }) => ({ productId, quantity }))
      const res = await fetch(`/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: user?.given_name, 
          email: user?.email, 
          items, 
          total: taxedTotal 
        }),
      })
      if (!res.ok) throw new Error("Failed to create order")
      const { orderId } = await res.json()
      clearCart()
      router.push(`/receipt/${orderId}`)
    } catch (err) {
      console.error("Error during checkout:", err)
      setError("An error occurred during checkout. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Your Cart</h1>

          <Button asChild variant={"ghost"}>
            <Link href="/"><ArrowLeft className="w-4 h-4 inline mr-1" />Continue Shopping</Link>
          </Button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400" />
            <h2 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Your cart is empty</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">Add some items to get started!</p>
            <Button asChild variant={"ghost"} className="mt-4 sm:mt-6 text-sm sm:text-base">
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 mb-24 sm:mb-0">
            <ul className="space-y-4">
              {cart.map((product) => (
                <li key={product.productId} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={`https://www.kroger.com/product/images/medium/front/${product.productId}`}
                        alt={product.description || "Product image"}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100 truncate">
                        {product.description || "Unknown Product"}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        ${product.items[0]?.price?.regular.toFixed(2) ?? 'N/A'}
                      </p>
                      <div className="mt-2 flex items-center space-x-2 sm:space-x-4">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(product.productId, product.quantity - 1)}
                            className="h-6 w-6 sm:h-8 sm:w-8"
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">{product.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(product.productId, product.quantity + 1)}
                            className="h-6 w-6 sm:h-8 sm:w-8"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromCart(product.productId)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 text-xs sm:text-sm"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-md sm:relative sm:p-6 sm:shadow-lg sm:rounded-lg">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600 dark:text-gray-400">Subtotal ({totalItems} items)</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">${cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600 dark:text-gray-400">Taxes</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">${taxAmount}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-lg font-semibold mb-6">
                  <p className="text-gray-900 dark:text-gray-100">Total</p>
                  <p className="text-gray-900 dark:text-gray-100">${taxedTotal}</p>
                </div>
                <div className="space-y-3">
                  <Input placeholder="Enter promo code" type="text" className="w-full" />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Proceed to Checkout</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Complete Your Purchase</DialogTitle>
                        <DialogDescription>Enter your payment details to finish your order.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={(e) => { e.preventDefault(); performCheckout(); }}>
                        <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="cardNumber" className="text-sm">Card Number</Label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="pl-10 text-sm" required />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="expiration" className="text-sm">Expiration Date</Label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input id="expiration" placeholder="MM/YY" className="pl-10 text-sm" required />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="cvv" className="text-sm">CVV</Label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input id="cvv" placeholder="123" className="pl-10 text-sm" required />
                              </div>
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cardholderName" className="text-sm">Cardholder Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input id="cardholderName" placeholder="John Doe" className="pl-10 text-sm" required />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
                          <Button type="submit" className="w-full text-sm sm:text-base" disabled={isLoading}>
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              'Complete Purchase'
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="w-full" onClick={clearCart}>Empty Cart</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}