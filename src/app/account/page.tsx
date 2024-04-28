import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


export default function page() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Account</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="/account" className="font-semibold text-primary">Profile</Link>
            <Link href="/orders">Orders</Link>
          </nav>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>
                        Information for this account used at checkout
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Enter your name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input id="address" placeholder="Enter your address" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Enter your city" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="Enter your state" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postal-code">Postal Code</Label>
                          <Input id="postal-code" placeholder="Enter your postal code" required />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </main>
    </div>
  
)
}
