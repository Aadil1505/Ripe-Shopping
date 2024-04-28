import Link from "next/link"
import { Apple, Milk, Beef, Beer, Snowflake } from 'lucide-react';
import {useRouter} from "next/navigation";

export default function Component() {



  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Shop by Category
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore our wide selection of grocery categories and find what you need.
              </p>
            </div>
          </div>
          <img
            alt="Hero Image"
            className="rounded-lg object-cover"
            height={600}
            src="https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            style={{
              aspectRatio: "800/600",
              objectFit: "cover",
            }}
            width={800}
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container grid grid-cols-2 gap-6 px-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5">
          <Link
            className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-center transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
            href="/products?term=produce"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-900 dark:group-hover:bg-gray-800">
              <Apple className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">Produce</span>
          </Link>
          <Link
            className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-center transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
            href="/products?term=dairy"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-900 dark:group-hover:bg-gray-800">
              <Milk className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">Dairy</span>
          </Link>
          <Link
            className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-center transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
            href="/products?term=meat"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-900 dark:group-hover:bg-gray-800">
              <Beef className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">Meat</span>
          </Link>


          <Link
            className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-center transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
            href="/products?term=beverages"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-900 dark:group-hover:bg-gray-800">
              <Beer className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">Beverages</span>
          </Link>
          <Link
            className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 text-center transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
            href="/products?term=frozen"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-900 dark:group-hover:bg-gray-800">
              <Snowflake className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">Frozen</span>
          </Link>



        </div>
      </section>
    </>
  )
}
