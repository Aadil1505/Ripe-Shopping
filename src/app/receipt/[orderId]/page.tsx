"use client"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Check } from 'lucide-react'

interface OrderItem {
  productId: string;
  quantity: number;
}

interface OrderData {
  total: number;
  items: OrderItem[];
}

interface ProductDetail {
  productId: string;
  description: string;
  quantity: number;
  images?: Array<{
    perspective: string;
    sizes: Array<{
      size: string;
      url: string;
    }>;
  }>;
  items: Array<{
    price: {
      regular: number;
    };
  }>;
}

export default function Page({ params }: { params: { orderId: string } }) {
  const orderId = params.orderId;
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState<ProductDetail[]>([]);

  const subtotal = total;
  const taxed = subtotal * 0.08625;
  const finaltotal = total + (subtotal * 0.08625);

  const fetchProductsDetails = async (productIds: string[]): Promise<ProductDetail[]> => {
    try {
      const products = await Promise.all(productIds.map(async (productId) => {
        const response = await fetch(`/api/products/${productId}`, {
          headers: {
            'Accept': 'application/json',
            'method': 'GET',
          },
        });
        return response.json();
      }));
      console.log(products);
      return products;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    const fetchOrderAndProducts = async () => {
      try {
        const orderRes = await fetch(`/api/receipt/${params.orderId}`, {
          headers: {
            'Accept': 'application/json',
            'method': 'GET',
          },
        });
        const orderData: OrderData = await orderRes.json();
        setTotal(orderData.total);
  
        const productIds = orderData.items.map(item => item.productId);
        const productDetails = await fetchProductsDetails(productIds);
  
        const detailedItems = productDetails.map(product => ({
          ...product,
          quantity: orderData.items.find(item => item.productId === product.productId)?.quantity || 0,
        }));
  
        setResults(detailedItems);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchOrderAndProducts();
  }, [params.orderId]);

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-950 py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-xl space-y-6 text-center">
                    <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-green-900 dark:bg-green-900/20 dark:text-green-50">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Order Confirmed</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Thank you for your order!</h1>
                    <div className="space-y-2">
                    <p className="text-gray-500 dark:text-gray-400">Your order #{orderId} has been confirmed.</p>
                    <p className="text-2xl font-bold">
                        Total:{' '}
                        <span className="text-primary">${finaltotal.toFixed(2)}</span>
                    </p>
                    </div>
                </div>
            </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-950 py-12 md:py-24">
            <div className="container px-4 md:px-6">
            <Table className="w-full border rounded-lg border-gray-200 dark:border-gray-800">
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>
                            <img
                                alt={product.description}
                                className="aspect-square rounded-md object-cover"
                                height={64}
                                src={
                                  product.images?.find(image => image.perspective === 'front')?.sizes.find(size => size.size === 'xlarge')?.url || 'default-image-url'
                              }
                                width={64}
                            />
                            </TableCell>
                            <TableCell className="font-medium">{product.description}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell className="text-right">${product.items[0]?.price?.regular.toFixed(2) ?? 'Unavailable'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Separator />
                
            
            <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>${taxed.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>${finaltotal.toFixed(2)}</span>
                </div>
            </div>
            </div>
      </div>
    </>
  )
}


