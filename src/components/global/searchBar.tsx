"use client"
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from 'next/navigation';




export default function SearchBar() {

  const [searchTerms, setSearchTerms] = useState('');
  const router = useRouter();
  
  
    
  const performSearch = () => {
    if (!searchTerms.trim()) return;
    console.log(searchTerms)
    // Navigate to the /products page with the search term as a query parameter
    router.push(`/products?term=${encodeURIComponent(searchTerms)}`);
  };




  return (
    <div>
        <Input 
            type="search" 
            placeholder="Search products..." 
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            value={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); 
                performSearch();
              }
            }}
        />
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        
    </div>
  )
}
