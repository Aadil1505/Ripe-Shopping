"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import convertor1 from "@/lib/api/quickpick";
import useCartStore, { CartItem } from '@/lib/hooks/useCartStore';

interface Product {
  productId: string;
  description: string;
  items: Array<{
    price: { regular: number };
    image?: { url: string };
  }>;
}

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [added, setAdded] = useState<Product[]>([]);
  const [showAddedItems, setShowAddedItems] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const fetchProducts = async (term: string): Promise<Product[]> => {
    try {
      const res = await fetch(`/api/products?term=${term}`, {
        headers: {
          'Accept': 'application/json',
          'method': 'GET',
        },
      });
      const data: Product[] = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowAddedItems(true);
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    try {
      const fileContent = await file.text();
      const items = await convertor1(fileContent);
      console.log(items);

      const productPromises = items.map(item => fetchProducts(item));
      const productResults = await Promise.all(productPromises);
      const products = productResults.flatMap(result => result).filter(Boolean);

      products.forEach(product => {
        const cartItem: CartItem = {
          productId: product.productId,
          quantity: 1,
          description: product.description,
          items: product.items
        };
        addToCart({ product: cartItem, quantity: 1 });
      });

      setAdded(products);
    } 
    catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-20 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Image Upload Section */}
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Upload Image</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Drag and drop an image of a shopping list and we'll make your cart!
            </p>
          </div>
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-600">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Drag and drop your image below
              </p>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" onChange={handleFileChange} />
              </div>
            </div>
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </div>

      {/* Image Preview Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Image Preview</h1>
        {imagePreviewUrl && (
          <div>
            <img
              src={imagePreviewUrl}
              alt="Uploaded Preview"
              className="mt-4 mx-auto max-w-xs"
            />
          </div>
        )}
      </div>

      {showAddedItems && (
        <div className="col-span-full text-center mt-8">
          <h2 className="text-3xl font-bold">We Added These Items To Your Cart...</h2>
          {added.length > 0 ? (
            added.map((product, index) => (
              <div key={index}>
                <h1>{product.description}</h1>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


