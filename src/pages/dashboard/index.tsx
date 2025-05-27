"use client";
import { Typography, Container, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import Image from "next/image";
import Banner from "@/assets/images/dubaibanner.jpg";
import Topbar from "@/components/topbar/topbar";
import Categorie from "@/components/catergories/catergorie"; // Fixed typo in import
import Carousel from "@/components/carousel/carousel"; // Standardized to 'Carousel'
import CardsPage from "@/pages/cards/cardspage"; // Adjusted path
import Listing from "@/components/listingcontent/listing";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, "access_token", { path: "/" });
    destroyCookie(null, "refresh_token", { path: "/" });
    router.push("/auth");
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        {/* Topbar */}
        <Topbar />

        {/* Banner Section */}
        <div className="relative w-full h-screen">
          <Image
            src={Banner}
            alt="banner"
            className="w-full h-full object-cover"
            priority
          />
          <h1 className="absolute top-1/2 left-[10%] text-white text-[35px] font-bold transform -translate-y-1/2">
            Sauda Project
          </h1>
        </div>

        {/* Main Content */}
        <Container maxWidth="lg" className="py-8 flex flex-col gap-8">
          <Typography variant="h4" className="text-center">
            Welcome to the Dashboard
          </Typography>
          <Categorie />
          <Carousel />
          <CardsPage />
          <Listing />
          {/* <Button
            variant="contained"
            className="bg-red-600 hover:bg-red-700 w-fit mx-auto"
            onClick={handleLogout}
          >
            Logout
          </Button> */}
        </Container>
      </div>
    </ProtectedRoute>
  );
}
