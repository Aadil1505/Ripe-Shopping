import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CircleUser, Menu, ShoppingBag, Leaf, Search, Check } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui//dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Searchbar from "./searchBar"
import Cart from "./cartIcon"


export default async function Navbar() {




  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/" 
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Leaf 
              className="h-6 w-6"
              />
            <span className="sr-only">Ripe Shopping</span>
          </Link>
          <Link
            href="/"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/categories"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Categories
          </Link>
          {/* <Link
            href="/deals"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Deals
          </Link> */}
          <Link
            href="/quickpick"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            QuickPick®
          </Link>
          <Link
            href="/help"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Help
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Leaf className="h-6 w-6" />
                <span className="sr-only">Ripe Shopping</span>
              </Link>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <Link
                href="/categories"
                className="text-muted-foreground hover:text-foreground"
              >
                Categories
              </Link>
              {/* <Link
                href="/deals"
                className="text-muted-foreground hover:text-foreground"
              >
                Deals
              </Link> */}
              <Link
                href="/quickpick"
                className="text-muted-foreground hover:text-foreground"
              >
                QuickPick®
              </Link>
              <Link
                href="/help"
                className="text-muted-foreground hover:text-foreground"
              >
                Help
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              /> */}
              <Searchbar />
            </div>
          </form>
          <Link href="/cart">
            {/* <Button variant="secondary" size="icon" className="rounded-full">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button> */}
            <Cart />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="relative rounded-full">
                <CircleUser className="h-5 w-5" />
                {(await isAuthenticated()) && (
                  <span className="absolute -top-1 -right-2 flex h-6 w-6 items-center justify-center text-xs text-black">
                    <Check />
                  </span>
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hi {user?.given_name}!</DropdownMenuLabel>
              <DropdownMenuSeparator />
                {!(await isAuthenticated()) ? (
                  <> 
                      {/* NOT AUTHENTICATED */}
                      <DropdownMenuItem>
                          <LoginLink>Sign in</LoginLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                          <RegisterLink>Sign Up</RegisterLink>
                      </DropdownMenuItem>
                  </>
                ) : (
                  <>
                      {/* AUTHENTICATED */}
                      <DropdownMenuItem>
                        <Link href="/account">Account</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/orders">Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                          <LogoutLink>Log Out</LogoutLink>
                      </DropdownMenuItem>
                  </>
                )}
                          </DropdownMenuContent>
                        </DropdownMenu>
        </div>
      </header>
  )
}
