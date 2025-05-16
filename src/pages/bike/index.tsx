import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import FilterComponent from "@/components/filter/filterComponent";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const handleFilterChange = (data:any) => {
  console.log("updated fileter", data)
}

export default function Home() {

  const [fileterValues, setFilterValues] = useState([]);
  console.log("fileterValues", fileterValues)

  useEffect(() => {
    fetch("/api/filterfields")
      .then((res) => res.json())
      .then((data) => setFilterValues(data));
  }, []);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      {
        fileterValues?.length > 0 &&
        <FilterComponent 
        fields={fileterValues}
        onFilterChange={handleFilterChange}
          />
      }

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div>This is Bike route</div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
        
      </footer>
    </div>
  );
}
