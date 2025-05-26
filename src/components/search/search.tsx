import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

// Define the shape of a search suggestion (based on backend response)
interface SearchItem {
  name: string; // e.g., "Toyota Yaris"
  category: string; // e.g., "Car"
  count: number; // e.g., 271
  link?: string; // e.g., "/search/toyota-yaris"
}

// Define the shape of the SearchContent prop
interface SearchContent {
  id: number;
  title: string; // Maps to backend 'name'
  ads: string; // Maps to backend 'count' (converted to string)
  link: string; // Maps to generated '/search/<name>'
}

// Props interface for BannerSearch
interface BannerSearchProps {
  SearchContent?: SearchContent[]; // Optional prop
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
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/search-suggestions/?q=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Map the backend response to match the SearchItem interface
      const formattedSuggestions = data.map(
        (item: { name: string; category: string; count: number }) => ({
          name: item.name,
          category: item.category,
          count: item.count,
          link: `/search/${encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, "-"))}`,
        })
      );
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

  // Handle search button click
  const handleSearch = () => {
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
    <div className="relative flex items-center gap-4">
      <input
        type="search"
        placeholder="Search anything..."
        className="w-[300px] h-[40px] rounded-full pl-5 pr-5 bg-white opacity-80"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute top-10 left-0 w-[300px] z-10">
        {query.length > 0 && (
          <ul className="mt-4 bg-white shadow rounded-md suggest-ul">
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <li
                  key={index} // Use unique ID from backend if available
                  className="p-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setQuery(item.name);
                  }}
                >
                  <a
                    href={item.link}
                    className="flex justify-between items-center text-black no-underline"
                  >
                    <p>{highlightMatch(item.name, query)}</p>
                    <p>{item.count} ads</p>
                  </a>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">
                {isLoading ? "Loading..." : "No results found."}
              </li>
            )}
          </ul>
        )}
      </div>
      <Button
        className="searchbutton"
        variant="contained"
        size="large"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default BannerSearch;