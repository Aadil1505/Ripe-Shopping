"use client"
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import useCartStore from "@/lib/hooks/useCartStore";

export default function CartIcon() {

    const totalItems = useCartStore(state => state.totalItems);

    return (
      <Button variant="secondary" size="icon" className="relative rounded-full">
        <ShoppingBag className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white">
            {totalItems}
          </span>
        )}
        <span className="sr-only">Cart</span>
      </Button>
    );
  }
  

