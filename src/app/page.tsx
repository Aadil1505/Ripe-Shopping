import Image from "next/image";
import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button, buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CircleUser, Menu, Package2, Leaf, Search } from "lucide-react";
import { CardContent, Card } from "@/components/ui/card"


export default async function Page() {
  
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();




  return (
    <main>
      {/* <h1>HOME PAGE</h1>
      <div>
        <Button>
          <LoginLink>Sign in</LoginLink>
        </Button>
        <Button>
          <RegisterLink>Sign Up</RegisterLink>
        </Button>
        <Button>
          <LogoutLink>Log Out</LogoutLink>
        </Button>
        <Link className={buttonVariants({ variant: "outline" })} href='https://google.com'>Click here</Link>
      </div>
      <div>
        User:{user?.given_name}
      </div> */}
      
      {/* DIVIDER */}
      <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 xl:py-24">
          <div className="container flex flex-col items-center justify-center px-4 space-y-4 md:flex-row md:space-y-0 md:gap-10 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 md:order-last md:text-center md:space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter lg:text-6xl xl:text-7xl/none">
                Fresh Groceries, Always
              </h1>
              <p className="max-w-[600px] text-gray-500/relaxed dark:text-gray-400">
                Order fresh fruits, vegetables, dairy, and pantry items online the easy way.
              </p>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full md:order-first"
              height="310"
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width="550"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-100">
          <div className="mb-20 items-center text-center">
            <h1 className="text-4xl font-bold tracking-tighter md:text-4xl/tight">Our Most Popular Items</h1>
          </div>
          <div className="container grid items-center gap-6 px-4 text-center md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Fresh Fruits</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore our wide variety of fresh fruits including apples, bananas, oranges, and more.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 items-center gap-6 lg:gap-12">
              {/* Apple Card */}
              <Link href="/products?term=Apple">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://i.imgur.com/BX2FV7m.png"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Apple</h3>
                    <p className="text-sm text-gray-500">An apple a day...</p>
                    <h4 className="font-bold">$2.99</h4>
                  </CardContent>
                </Card>
              </Link>
              {/* Banana Card */}
              <Link href="/products?term=Banana">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Banana</h3>
                    <p className="text-sm text-gray-500">Great for smoothies!</p>
                    <h4 className="font-bold">$1.99</h4>
                  </CardContent>
                </Card>
              </Link>
              {/* Orange Card */}
              <Link href="/products?term=Orange">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://images.unsplash.com/photo-1591206369811-4eeb2f03bc95?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Orange</h3>
                    <p className="text-sm text-gray-500">Juicy and delicious</p>
                    <h4 className="font-bold">$3.49</h4>
                  </CardContent>
                </Card>
              </Link>
              {/* Lemon Card */}
              <Link href="/products?term=Lemon">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://images.unsplash.com/photo-1594304466740-01a51b280fd3?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Lemon</h3>
                    <p className="text-sm text-gray-500">Sour and Juicy</p>
                    <h4 className="font-bold">$3.49</h4>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-100">
          <div className="container grid items-center gap-6 px-4 text-center md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Fresh Vegetables</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore our wide variety of fresh vegetables including carrots, tomatoes, lettuce, and more.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 items-center gap-6 lg:gap-12">
              {/* Carrots Card */}
              <Link href="/products?term=Carrots">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://images.unsplash.com/photo-1522184216316-3c25379f9760?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Carrots</h3>
                    <p className="text-sm text-gray-500">Healthy and crunchy</p>
                    <h4 className="font-bold">$2.99</h4>
                  </CardContent>
                </Card>
              </Link>
              {/* Corn Card */}
              <Link href="/products?term=Corn">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Corn</h3>
                    <p className="text-sm text-gray-500">Healthy and delicious</p>
                    <h4 className="font-bold">$2.99</h4>
                  </CardContent>
                </Card>
              </Link>
              {/* Tomatoes Card */}
              <Link href="/products?term=Tomatoes">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://images.unsplash.com/photo-1606588260160-0c4707ab7db5?q=80&w=2930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Tomatoes</h3>
                    <p className="text-sm text-gray-500">Perfect for salads</p>
                    <h4 className="font-bold">$1.99</h4>
                  </CardContent>
                </Card>
              </Link>
              {/* Lettuce Card */}
              <Link href="/products?term=Lettuce">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://images.unsplash.com/photo-1595739431055-6c308d9f5af3?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Lettuce</h3>
                    <p className="text-sm text-gray-500">Fresh and crisp</p>
                    <h4 className="font-bold">$3.49</h4>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-100">
          <div className="container grid items-center gap-6 px-4 text-center md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Dairy</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Fresh milk, cheese, yogurt, and ice cream of your dreams.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 items-center gap-6 lg:gap-12">
              {/* Milk Card */}
              <Link href="/products?term=Milk">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://images.unsplash.com/photo-1596633605700-1efc9b49e277?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Milk</h3>
                    <p className="text-sm text-gray-500">Fresh and delicious</p>
                    <h4 className="font-bold">$2.99</h4>
                  </CardContent>
                </Card>
              </Link>
              {/* Yogurt Card */}
              <Link href="/products?term=Yogurt">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://images.unsplash.com/photo-1564149503905-7fef56abc1f2?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Yogurt</h3>
                    <p className="text-sm text-gray-500">Tasty and nutritious</p>
                    <h4 className="font-bold">$2.99</h4>
                  </CardContent>
                </Card>
              </Link>
              {/* Cheese Card */}
              <Link href="/products?term=Cheese">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                    src="https://images.unsplash.com/photo-1589881210718-42da05899fe4?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={400}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold">Cheese</h3>
                    <p className="text-sm text-gray-500">Perfect for sandwiches</p>
                    <h4 className="font-bold">$1.99</h4>
                  </CardContent>
                </Card>
              </Link>
              {/* Ice Cream Card */}
              <Link href="/products?term=Ice Cream">
                <Card>
                  <img
                    alt="Image"
                    className="aspect-image object-cover w-full h-80"
                    height={225}
                  src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={400}
                />
                <CardContent className="p-4">
                  <h3 className="font-bold">Ice Cream</h3>
                  <p className="text-sm text-gray-500">Creamy and delicious</p>
                  <h4 className="font-bold">$3.49</h4>
                </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
        
      </main>
    </div>

    </main>
  );
}
