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
  openGraph: {
		title: "Ripe Shopping",
		description:
			"Ripe's Grocery Shopping Web App",
		url: "https://ripe-shopping.vercel.app/",
    images: [{
      url: "https://i.imgur.com/xY26Ter.png",
    }],
	},
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      </body>
    </html>
  );
}
