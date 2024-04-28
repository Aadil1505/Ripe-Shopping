import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ripe Shopping",
  description: "Ripe's Grocery Shopping Web App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer/>

      </body>
    </html>
  );
}
