"use client"
import Image from 'next/image';
import { Star } from "lucide-react";
import { useEffect, useState, ChangeEvent } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCartStore from '@/lib/hooks/useCartStore';

interface Product {
  brand?: string;
  description?: string;
  items: {
    price: {
      regular: number;
    },
    size?: string;
  }[];
  images: {
    perspective: string;
    sizes: {
      size: string;
      url: string;
    }[];
  }[];
  categories?: string[];
  temperature?: {
    indicator?: string;
  };
  productId?: string;
}

export default function Page({ params }: { params: { productId: string } }) {
  const [results, setResults] = useState<Product | null>(null);

  const cart = useCartStore((state: { cart: any; }) => state.cart);
  const addToCart = useCartStore((state: { addToCart: any; }) => state.addToCart);

  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products/${params.productId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const data: Product = await response.json();
        setResults(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProducts();
  }, [params.productId]);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    event.preventDefault();
    if (product) {
      addToCart({ product, quantity });
    }
  };

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-6 lg:gap-12 max-w-6xl mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="grid gap-4 items-start">
          <h1 className="text-3xl font-bold">{results.brand}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <Star className="w-5 h-5 fill-primary" />
              <Star className="w-5 h-5 fill-primary" />
              <Star className="w-5 h-5 fill-primary" />
              <Star className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <Star className="w-5 h-5 fill-muted stroke-muted-foreground" />
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
                value={quantity.toString()}
                onChange={handleChangeQuantity}
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
            src={
              (results.images && results.images.find(image => image.perspective === 'front')?.sizes.find(size => size.size === 'xlarge'))?.url || 'default-image-url'
          }
          />
        </div>
      </div>
      <div className="grid gap-4 items-start">
        <h2 className="text-2xl font-bold">Other Information</h2>
        <div className=" gap-10 flex">
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Temperature</h3>
            <p>{results?.temperature?.indicator}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Category</h3>
            <p>{results?.categories}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Size</h3>
            <p>{results?.items?.[0]?.size}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Product ID / UPC</h3>
            <p>{results?.productId}</p>
          </div>
          
          
        </div>
      </div>
    </div>
  )
}


