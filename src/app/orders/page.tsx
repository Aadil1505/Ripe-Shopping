"use client"
import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import Link from "next/link"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {useRouter} from "next/navigation";

// Define an interface for the order structure
interface Order {
  orderId: string;
  total: number;
  // Add other properties as needed
}

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const {user} = useKindeBrowserClient();

  const router = useRouter();
  const email = user?.email
  console.log(email)

  useEffect(() => {
    const fetchOrders = async () => {
      if(email != null){

        try {
          const response = await fetch(`/api/orders/${email}`, {
            headers: {
              'Content-Type': 'application/json',
              'method': 'GET',
            },
          });
          const data = await response.json();
          setOrders(data.orders);
        } catch (err) {
          console.error("There was an error fetching the orders", err);
        } 
      }
    };

    fetchOrders();
  }, [email]);

  console.log(orders)



  const testfunc = (orderId: string) => {
    router.push(`/reciept/${orderId}`);
  }



  return (
    <div className="flex min-h-screen w-full flex-col">
      
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Account</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="/account">Profile</Link>
            <Link href="/orders" className="font-semibold text-primary">Orders</Link>
          </nav>

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                    <TableRow key={order.orderId}>
                        <TableCell className="font-medium" onClick={() => testfunc(order.orderId)}>{order.orderId}</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            
        </div>
      </main>
    </div>
  )
}
