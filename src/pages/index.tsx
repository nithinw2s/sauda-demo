import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
  <div>
    <h1 className="font-bold text-green-500">hello auth</h1>

    <Button size={"lg"} 
      color="primary">
      click me
    </Button>
  </div>
  );
}
