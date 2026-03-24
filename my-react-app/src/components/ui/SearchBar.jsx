/**
 * 🔍 SearchBar Component
 * Search input with suggestions
 */
import { useState } from "react";
import "./SearchBar.css";

export function SearchBar({ onSearch, onSuggestion, placeholder = "Search movies..." }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // TODO: Fetch suggestions based on value
    // TODO: Call onSuggestion callback
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call onSearch with query
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      {/* Search input and suggestions */}
    </form>
  );
}
