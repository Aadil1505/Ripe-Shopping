import Link from "next/link"
import { Home, ShoppingBag, Info } from 'lucide-react'

export default function Component() {
  return (
    <footer className="w-full py-6">
      <div className="container flex flex-col gap-4 items-center px-4 md:flex-row md:justify-between md:px-6 lg:gap-6">
        <div className="flex gap-4 text-center md:order-2 md:gap-8 md:text-left">
          <Link className="flex items-center gap-2 text-sm font-medium tracking-wide uppercase" href="/">
            <Home className="w-5 h-5" />
            Home
          </Link>
          <Link className="flex items-center gap-2 text-sm font-medium tracking-wide uppercase" href="/cart">
            <ShoppingBag className="w-5 h-5" />
            Cart
          </Link>
          <Link className="flex items-center gap-2 text-sm font-medium tracking-wide uppercase" href="/help">
            <Info className="w-5 h-5" />
            Contact us
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-center md:order-1 md:text-left lg:gap-4">
          <p className="text-xs tracking-wide/relaxed">© 2024 Ripe Inc. All rights reserved.</p>
          <p className="text-xs tracking-wide/relaxed">Made with love in New York.</p>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm md:order-3 md:gap-8">
          <Link className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50" href="#">
            Terms
          </Link>
          <Link className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50" href="#">
            Privacy
          </Link>
          <Link className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50" href="#">
            Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

