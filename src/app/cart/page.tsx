"use client"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import useCartStore from "@/lib/hooks/useCartStore"
import { Trash2, CreditCard, Calendar, Lock, User } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation';
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";





export default function Page() {

  const cart = useCartStore(state => state.cart)
  const setCartQuantity = useCartStore(state => state.setCartQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const clearCart = useCartStore(state => state.clearCart)
  const cartTotal = useCartStore((state) => state.cartTotal);
  const totalItems = useCartStore((state) => state.totalItems);
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId)
  }
  const updateQuantity = (productId, quantity) => {
    setCartQuantity({ productId, quantity });
  };
  console.log("cart from cart", cart)
  const productIds = cart.map(({ productId }) => productId);

  const items = cart.map(product => ({
    productId: product.productId,
    quantity: product.quantity
  }));
  const taxed = (cartTotal * .08625).toFixed(2)
  const taxedTotal = ((cartTotal * .08625) + cartTotal).toFixed(2)


  const router = useRouter();



  const { user } = useKindeBrowserClient();
  const name = user?.given_name
  const email = user?.email



  console.log(name, email, items)








  // POST ORDER DETAILS TO API FOR DATABASE AND SEND TO CONFIRM PAGE
  const performConfirm = async () => {


    try {
      const res = await fetch(`/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, items, total: taxedTotal }),
      });
      const data = await res.json();
      console.log(data.orderId);
      clearCart()
      router.push(`/reciept/${data.orderId}`);
      
    } catch (err) {
      console.log(err);
    }

  };














  return (
    <div className="flex flex-col h-full">
      <header className="bg-gray-100 dark:bg-gray-800 py-4 px-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </header>
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid gap-6">
        {cart.map((product, index) => (
          <div key={index} className="grid grid-cols-[80px_1fr_80px_80px_80px] items-center gap-4">

            <Link  href={`/products/${product.productId}`}>
              <img
                alt={product.description}
                className="rounded-md"
                height={80}
                src={product.images.find(image => image.perspective === 'front').sizes.find(size => size.size === 'xlarge').url}
                style={{
                  aspectRatio: "80/80",
                  objectFit: "cover",
                }}
                width={80}
              />
            </Link>

            <Link  href={`/products/${product.productId}`}>
              <div>
                <h3 className="font-medium">{product.brand}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {product.description}
                </p>
              </div>
            </Link>
            <div className="text-right">
              <p className="font-medium">${product.items?.[0]?.price?.regular ?? 'Unavailable'}</p>
            </div>
            <div className="text-center">
              <Input type="number" min="1" value={product.quantity} className="w-full" onChange={(e) => updateQuantity(product.productId, e.target.value)} />
            </div>
            <div className="text-right">
              <Button size="lg" onClick={() => {handleRemoveFromCart(product.productId)}}><Trash2 /></Button>
            </div>
          </div>
        ))}



        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 space-y-4">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <p>Subtotal ({totalItems} Items)</p>
          <p className="font-medium">${cartTotal.toFixed(2)}</p>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <p>Taxes (NY)</p>
          <p className="font-medium">${taxed}</p>
        </div>
        <Separator />
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <p className="font-medium">Total</p>
          <p className="text-2xl font-bold">${taxedTotal}</p>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <div className="flex gap-x-4">
            <Input className="w-1/2" placeholder="Promo code" type="text" />
            <Button size="lg" className="w-1/4" onClick={() => {clearCart()}}>Empty Cart</Button>

            {/* CREDIT CARD INFO FOR CHECKOUT */}
            <Dialog>
              <DialogTrigger asChild>
              <Button size="lg" className="w-1/4">Checkout</Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>Enter your credit card details</DialogDescription>
                </DialogHeader>
                <div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                        <Input className="pl-10" id="cardNumber" placeholder="0000 0000 0000 0000" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiration">Expiration Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                          <Input className="pl-10" id="expiration" placeholder="MM/YY" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                          <Input className="pl-10" id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                        <Input className="pl-10" id="cardholderName" placeholder="John Doe" />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button className="ml-auto" onClick={() => performConfirm()}>Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
