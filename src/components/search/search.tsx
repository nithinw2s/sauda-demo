// import * as React from "react";
// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@mui/material";
// import banner_img from "../../assets/images/banner.jpg";

// interface SearchItem {
//   id: number;
//   title: string;
//   ads: string;
//   link: string;
// }

// interface Props {
//   SearchContent: SearchItem[];
// }

// const BannerSearch: React.FC<Props> = ({ SearchContent }) => {
//   const [query, setQuery] = useState("");

//   const filtered = SearchContent.filter((item) =>
//     item.title.toLowerCase().includes(query.toLowerCase())
//   );

//   const highlightMatch = (text: string, query: string) => {
//     if (!query) return text;
  
//     const regex = new RegExp(`(${query})`, 'gi');
//     const parts = text.split(regex);
  
//     return parts.map((part, index) =>
//       regex.test(part) ? <strong key={index} className="text-green-500">{part}</strong> : part
//     );
//   };
  

//   const SearchBtn = () => {
//     const matchedItem = SearchContent.find(
//       (item) => item.title.toLowerCase() === query.toLowerCase()
//     );
  
//     if (matchedItem) {
//       window.location.href = matchedItem.link;
//     } else {
//       alert("No matching result found");
//     }
//   };
  

//   return (
//     <>
//           <div className="relative">
//             <input
//               type="search"
//               placeholder="Search mobile brand..."
//               className="w-[600px] h-[50px] rounded-full pl-5 pr-5 bg-white opacity-80"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <div className="absolute top-10 left-0 w-[400px]">
//                 {query.length > 0 && (
//               <ul className="mt-4 bg-white shadow rounded-md suggest-ul">
//                 {filtered.length > 0 ? (
//                   filtered.map((item) => (
//                     <li
//                       key={item.id}
//                       className="p-2 border-b last:border-b-0"
//                     onClick={() => {
//                         setQuery(item.title);
//                     }}
//                     >
//                     <a href={item.link} className="flex justify-between items-center">
//                     <p>{highlightMatch(item.title, query)}</p>
//                       <p>{item.ads}</p>
//                     </a>    
//                     </li>
//                   ))
//                 ) : (
//                   <li className="p-2 text-gray-500 text-white">No results found.</li>
//                 )}
//               </ul>
//             )}
//             </div>
//           </div>
//     </>
//   );
// };
// export default BannerSearch;

import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import banner_img from "../../assets/images/banner.jpg";

// Define the shape of a search suggestion (based on your backend response)
interface SearchItem {
  name: string; // e.g., "Toyota Yaris"
  category: string;
  count: number; // e.g., 271

  link?: string; // e.g., "/search/toyota-yaris"
}

const BannerSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch suggestions from the backend when the query changes (with debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300); // 300ms delay to debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Function to fetch suggestions from the Django backend
  const fetchSuggestions = async (searchTerm: string) => {
    setIsLoading(true);
      console.log("hi",searchTerm)
    try {
      const response = await fetch(
      
        `http://127.0.0.1:8000/api/search-suggestions/?q=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Map the backend response to match the SearchItem interface
      const formattedSuggestions = data.map((item: { name: string; category: string; count: number }) => ({
        name: item.name,
        category:item.category,
        count: item.count,
       
        link: `/search/${encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, "-"))}`, // e.g., "/search/toyota-yaris"
      }));
      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Highlight the matching part of the query in the suggestion
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <strong key={index} className="text-green-500">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  // Handle search button click (optional, not shown in the screenshot but kept for functionality)
  const SearchBtn = () => {
    const matchedItem = suggestions.find(
      (item) => item.name.toLowerCase() === query.toLowerCase()
    );

    if (matchedItem) {
      window.location.href = matchedItem.link || "#";
    } else {
      alert("No matching result found");
    }
  };

  return (
    <>
      <div className="relative flex items-center gap-4">
        <input
          type="search"
          placeholder="Search mobile brand..."
          className="w-[300px] h-[40px] rounded-full pl-5 pr-5 bg-white opacity-80 rounded-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute top-10 left-0 w-[300px]">
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
        <Button className="searchbutton" variant="contained" size="large">
          Search
        </Button>
      </div>
    </>
  );
};

export default BannerSearch;