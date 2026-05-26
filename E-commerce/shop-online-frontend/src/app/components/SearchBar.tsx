"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?name=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className="flex items-center justify-between gap-2 bg-gray-100 px-4 py-2 rounded-md shadow-sm flex-1"
    >
      <input
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none text-sm"
      />
      <button type="submit" className="cursor-pointer p-1">
        <Image src="/search.png" alt="Search Icon" width={16} height={16} />
      </button>
    </form>
  );
};

export default SearchBar;
