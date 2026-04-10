/**
 * 🔍 SearchBar Component
 * Search input with suggestions
 */
import { useState, useEffect, useRef } from "react";

export function SearchBar({ onSearch, placeholder = "Search movies..." }) {
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch?.(val);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    onSearch?.(query);
  };

  return (
    <form className="flex w-full max-w-lg" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 rounded-l-md bg-gray-800 border border-gray-600 text-white text-sm focus:outline-none focus:border-red-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-r-md text-sm font-medium transition"
      >
        Search
      </button>
    </form>
  );
}
