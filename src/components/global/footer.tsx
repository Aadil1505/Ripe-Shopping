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

function ContactIcon(props) {
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
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <circle cx="12" cy="10" r="2" />
      <line x1="8" x2="8" y1="2" y2="4" />
      <line x1="16" x2="16" y1="2" y2="4" />
    </svg>
  )
}


function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
