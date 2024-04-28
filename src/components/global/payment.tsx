
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"


export default function Component() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Payment Method</Button>
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
          <Button className="ml-auto">Save Card</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
