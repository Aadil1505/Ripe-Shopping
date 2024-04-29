'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CardContent, Card } from "@/components/ui/card"
import Link from 'next/link';
import useCartStore from '@/lib/hooks/useCartStore';


export default function Page() {

  const cart = useCartStore(state => state.cart)
  const addToCart = useCartStore(state => state.addToCart)
  console.log("This is the cart" , cart)

  const [sortOrder, setSortOrder] = useState('ASC'); 





  const handleAddToCart = (use: any) => {
    console.log(use)
    addToCart( { product:use, quantity:1 } )
  }




  const searchParams = useSearchParams()
  const search = searchParams.get('term')
  console.log("The search is for: " + search)

  const [results, setResults] = useState([]);




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?term=${search}`, {
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
  }, [search]);

  useEffect(() => {
    if (sortOrder === 'ASC') {
      setResults(results => [...results].sort((a, b) => (a.items[0].price.regular - b.items[0].price.regular)));
    } else {
      setResults(results => [...results].sort((a, b) => (b.items[0].price.regular - a.items[0].price.regular)));
    }
  }, [sortOrder, results.length]);



  return (
    <div className="space-y-6 grid md:grid-cols-[240px_1fr] gap-6 items-start max-w-8xl mx-auto px-4 py-6">
      <div className="flex flex-col gap-2">
        <div className="grid gap-2">
          <h2 className="font-semibold">Category</h2>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="category-produce" />
              Produce{"\n                      "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="category-dairy" />
              Dairy{"\n                      "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="category-meat" />
              Meat{"\n                      "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="category-seafood" />
              Seafood{"\n                      "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="category-snacks" />
              Snacks{"\n                      "}
            </Label>
          </div>
        </div>

        <Button onClick={() => setSortOrder('ASC')}>Price Low to High</Button>
        <Button onClick={() => setSortOrder('DESC')}>Price High to Low</Button>
      </div>



      <div className="grid gap-4">
      <h1 className='font-bold'>Search results for {search}</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          
          {results.map((product, index) => (
            
              <Card key={index}>
                  <Link  href={`/products/${product.productId}`}>
                  <div className="aspect-card">
                      <img
                      alt={product.description} // Assuming the item has a name field
                      className="aspect-object object-cover rounded-t-lg"
                      src={product.images.find(image => image.perspective === 'front').sizes.find(size => size.size === 'xlarge')?.url} // Assuming the item has an imageUrl field
                      />
                  </div>
                  </Link>
                  <CardContent className="flex flex-col gap-2 py-4">
                    <Link  href={`/products/${product.productId}`}>
                      <h3 className="font-semibold tracking-tight">{product.description}</h3>
                    </Link>
                      <small className="text-sm leading-none text-gray-500 dark:text-gray-400">{product.categories[0]}</small> 
                      <h4 className="font-semibold">${product.items?.[0]?.price?.regular ?? 'Unavailable'}</h4>
                      <Button size="sm" onClick={() => handleAddToCart(product)}>Add To Cart</Button>
                  </CardContent>
              </Card>
          ))}
          
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                <ChevronLeftIcon className="w-3 h-3 -translate-x-1" />
                Prev
                </Button>
                <Button size="sm" variant="outline">
                Next
                <ChevronRightIcon className="w-3 h-3 -translate-x-1" />
                </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}




