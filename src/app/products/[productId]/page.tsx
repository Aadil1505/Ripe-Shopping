'use client'
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useCartStore from '@/lib/hooks/useCartStore';

export default function Page({ params }: {params: { productId: string }}) {
  const [results, setResults] = useState([]);



  const cart = useCartStore(state => state.cart)
  const addToCart = useCartStore(state => state.addToCart)
  console.log("This is the cart" , cart)

  const[quantity, setQuantity] = useState(1)
  console.log(quantity)




  const handleAddToCart = (event: any, use: any) => {
    event.preventDefault(); 
    console.log(use);
    addToCart({ product: use, quantity: parseInt(quantity, 10) });
}











  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products/${params.productId}`, {
          headers: {
            'Accept': 'application/json',
            'method': 'GET',
          },
        });
        const data = await res.json();
        console.log(data);
        setResults(data)
      } catch (err) {
        console.log(err);
      }
    }

    fetchProducts();
  }, [params.productId]);


  return (
    <div className="grid gap-6 lg:gap-12 max-w-6xl mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="grid gap-4 items-start">
          <h1 className="text-3xl font-bold">{results.brand}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <div className="text-sm text-muted-foreground">3 Stars</div>
          </div>
          <div className="grid gap-2 text-base sm:text-lg leading-none font-semibold">
            <p>
              {results.description}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">${results.items?.[0]?.price?.regular}</div>
          </div>
          <form className="grid gap-4 md:gap-8">
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="quantity">
                Quantity
              </Label>
              <Input 
                className="w-20" 
                min="1"
                type="number" 
                id="Quantity" 
                placeholder="Qty" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <Button size="lg" onClick={(e) => handleAddToCart(e, results)}>Add to cart</Button>
          </form>

        </div>
        <div className="grid gap-4 md:gap-8 items-start">
          <img
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={600}
            src={results?.images?.[1]?.sizes?.[0]?.url ?? 'default-image-url'}
          />
        </div>
      </div>
      <div className="grid gap-4 items-start">
        <h2 className="text-2xl font-bold">Other Information</h2>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Great taste</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-muted-foreground">4/5</span>
            </div>
            <p>The strawberries were delicious and sweet. I loved the taste and will definitely buy them again.</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Disappointing</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-muted-foreground">3/5</span>
            </div>
            <p>I found the strawberries to be a bit sour. Wasn't very happy with the quality.</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Delicious</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-muted-foreground">3/5</span>
            </div>
            <p>The strawberries were delicious and sweet. I loved the taste and will definitely buy them again.</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Perfect</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-muted-foreground">3/5</span>
            </div>
            <p>The strawberries were delicious and sweet. I loved the taste and will definitely buy them again.</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Great taste</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-muted-foreground">3/5</span>
            </div>
            <p>The strawberries were delicious and sweet. I loved the taste and will definitely buy them again.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
