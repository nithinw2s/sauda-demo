import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import banner_img from "../../assets/images/banner.jpg";

interface SearchItem {
  id: number;
  title: string;
  ads: string;
  link: string;
}

interface Props {
  SearchContent: SearchItem[];
}

const BannerSearch: React.FC<Props> = ({ SearchContent }) => {
  const [query, setQuery] = useState("");

  const filtered = SearchContent.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
  
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
  
    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index} className="text-green-500">{part}</strong> : part
    );
  };
  

  const SearchBtn = () => {
    const matchedItem = SearchContent.find(
      (item) => item.title.toLowerCase() === query.toLowerCase()
    );
  
    if (matchedItem) {
      window.location.href = matchedItem.link;
    } else {
      alert("No matching result found");
    }
  };
  

  return (
    <>
      <div className="relative">
        <Image
          src={banner_img}
          alt="Banner"
          className="w-full h-[100vh] opacity-30 "
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-5">
          <div className="relative">
            <input
              type="search"
              placeholder="Search mobile brand..."
              className="w-[400px] h-[50px] rounded-full pl-5 pr-5 bg-white opacity-80"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute top-10 left-0 w-full">
                {query.length > 0 && (
              <ul className="mt-4 bg-white shadow rounded-md suggest-ul">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <li
                      key={item.id}
                      className="p-2 border-b last:border-b-0"
                    onClick={() => {
                        setQuery(item.title);
                    }}
                    >
                    <a href={item.link} className="flex justify-between items-center">
                    <p>{highlightMatch(item.title, query)}</p>
                      <p>{item.ads}</p>
                    </a>    
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500 text-white">No results found.</li>
                )}
              </ul>
            )}
            </div>
          </div>
          <Button size="medium" variant="contained" onClick={SearchBtn}>
            Search
          </Button>
        </div>
      </div>
    </>
  );
};
export default BannerSearch;
