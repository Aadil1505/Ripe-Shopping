import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

export default function Component({ params }: {params: { productId: string }}) {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-950 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-xl space-y-6 text-center">
            <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-green-900 dark:bg-green-900/20 dark:text-green-50">
              <CheckIcon className="mr-2 h-5 w-5" />
              <span>Order Confirmed</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Thank you for your order!</h1>
            <div className="space-y-2">
              <p className="text-gray-500 dark:text-gray-400">Your order #1234 has been confirmed.</p>
              <p className="text-2xl font-bold">
                Total:
                <span className="text-primary">$149.99</span>
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
              <TableRow>
                <TableCell>
                  <img
                    alt="Acme Widgets"
                    className="aspect-square rounded-md object-cover"
                    height={64}
                    src="/placeholder.svg"
                    width={64}
                  />
                </TableCell>
                <TableCell className="font-medium">Acme Widgets</TableCell>
                <TableCell>2</TableCell>
                <TableCell className="text-right">$29.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Acme Gizmos"
                    className="aspect-square rounded-md object-cover"
                    height={64}
                    src="/placeholder.svg"
                    width={64}
                  />
                </TableCell>
                <TableCell className="font-medium">Acme Gizmos</TableCell>
                <TableCell>1</TableCell>
                <TableCell className="text-right">$89.99</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Separator />
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>$149.97</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span className="text-green-500">-$10.00</span>
            </div>
            <div className="flex items-center justify-between font-bold">
              <span>Total</span>
              <span>$139.97</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function CheckIcon(props) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
