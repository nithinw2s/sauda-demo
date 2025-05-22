import { ListingContent } from "@/utils/const";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { carouselData } from "@/utils/carousel";
import Link from "next/link";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

const Listing = () => {
  return (
    <div className="py-10 w-[75%] mx-auto">
      <h2 className="text-[30px] font-semibold mb-4">
        Motorcycles for sale in Dubai
      </h2>
      {ListingContent.map((item, idx) => (
        <Link href={item.link} key={idx} className="flex gap-5 py-5 border-b border-b-[#5f5757] listingCAROUSAL">
          <div className="w-[40%] rounded-[20px] relative">
            <Swiper
              navigation={true}
              pagination={{ clickable: true }}
              loop={true}
              modules={[Navigation, Pagination]} className="rounded-[20px]">
              {carouselData.map((card, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={card.image}
                    alt={`Slide ${index + 1}`}
                    className="h-[100%] w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <FavoriteBorderIcon className="text-white absolute top-[5%] right-[60px] z-20"/>
            <ReplyOutlinedIcon className="text-white absolute top-[5%] right-[25px] z-20 -scale-x-100"/>
          </div>
          <div className="w-[60%]">
            <h5 className="text-[18px] font-semibold mb-2">{item.name}</h5>
            <p className="text-[12px] mb-2">Off Road</p>
            <p className="text-[18px] font-semibold mb-3">{item.price}</p>

            <div className="flex gap-5 mb-3">
              <div className="bg-white px-[10px] py-[5px] rounded-[10px]">
                <h5 className="text-[14px] text-[#7b7878]">Year</h5>
                <p className="text-[14px] font-semibold">{item.year}</p>
              </div>
              <div className="bg-white px-[10px] py-[5px] rounded-[10px]">
                <h5 className="text-[14px] text-[#7b7878]">Kilometer</h5>
                <p className="text-[14px] font-semibold">{item.kilometer}</p>
              </div>
            </div>

            <span className="flex gap-4 items-center mb-3">
              <LocationOnIcon/>
              <p className="text-[20px]">{item.location}</p>
              <p className="text-[14px] relative before:content-[''] before:w-[4px] before:h-[4px] before:bg-[#6B6D70] before:rounded-full before:inline-block before:mr-2">
                {item.date}
              </p>
            </span>

            <div className="flex gap-2">
              <p className="bg-[#c8f5e6] text-[15px] p-2"><ChatBubbleIcon className="text-[#42b4d9]"/>Chat</p>
              <p className="bg-[#c8f5e6] text-[15px] p-2"><CallIcon className="text-[#ff0000]"/> Call</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Listing;