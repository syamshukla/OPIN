"use client";

import { SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import reddit from "../../public/reddit.svg"; // Replace with actual logo paths
import quora from "../../public/quora.svg"; // Replace with actual logo paths
import def from "../../public/default.svg"; // Replace with actual logo paths
import stackOverflow from "../../public/stack_overflow.svg"; // Replace with actual logo paths
import github from "../../public/github.svg"; // Replace with actual logo paths
import ycombinator from "../../public/ycombinator.svg"; // Replace with actual logo paths
import medium from "../../public/medium.svg"; // Replace with actual logo paths
const sourceLogos = {
  "reddit.com": reddit,
  "quora.com": quora,
  "stackoverflow.com": stackOverflow,
  "github.com": github,
  "news.ycombinator.com": ycombinator,
  "*.medium.com": medium,

  // Add more sources as needed
};

const defaultLogo = def; // Replace with your placeholder logo path

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newQuery, setNewQuery] = useState("");
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setResults([]);
    setError("");
    setLoading(true); // Set loading to true

    if (query) {
      try {
        const response = await fetch(`/api/search?q=${query}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setResults(data);
        setNewQuery(query);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Error fetching search results");
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const getSourceLogo = (source: string | URL) => {
    try {
      const url = new URL(source);
      const hostname = url.hostname.replace(/^www\./, ""); // Remove "www." if present
      //@ts-ignore
      return sourceLogos[hostname] || defaultLogo;
    } catch (error) {
      return defaultLogo; // Fallback if URL is invalid
    }
  };
  return (
    <div className="flex flex-col mt-20 mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">Search</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Search
          </Button>
        </div>
        {error && <p className="text-red-500 font-medium mt-2">{error}</p>}
      </form>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-4">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Search Results for "{newQuery}"
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(
              (
                result: { link: string; title: string; snippet: string },
                index
              ) => (
                <div
                  key={index}
                  className=" rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
                >
                  <div className="flex items-center mb-2">
                    <Image
                      src={getSourceLogo(result.link)}
                      alt={`${result.title} logo`}
                      className="h-6 w-6 mr-2"
                    />
                    <h2 className="text-lg font-medium">{result.title}</h2>
                  </div>
                  <p className="text-gray-600 flex-grow">{result.snippet}</p>
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-primary-500 hover:underline"
                  >
                    Read more
                  </a>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <p className="mt-4 text-gray-600">No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
