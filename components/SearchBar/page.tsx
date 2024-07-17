"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setResults([]); // Clear previous results
    setError("");

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
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Error fetching search results");
      }
    }
  };

  return (
    <div className="flex flex-col mt-20 mx-auto  px-4 py-8 sm:px-6 lg:px-8">
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
      {results.length > 0 && (
        <>
          <h1 className="text-3xl font-bold mb-4">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Search Results for "{query}"
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(
              (
                result: { link: string; title: string; snippet: string },
                index
              ) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4"
                  >
                    <h2 className="text-lg font-medium mb-2">{result.title}</h2>
                    <p className="text-gray-600">{result.snippet}</p>
                  </a>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
