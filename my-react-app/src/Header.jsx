import { useState } from "react";
import { Link } from "react-router-dom"; // import Link

const Header = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const keyword = e.target.value;
    setValue(keyword);
    onSearch(keyword);
  };

  const handleClick = () => {
    onSearch(value);
  };

  return (
    <div className="p-4 bg-black flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-[40px] uppercase font-bold text-red-700">
          Movie box
        </h1>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/movies" className="text-white">Movies</Link>
          <Link to="/favorites" className="text-white">Favorites</Link>
          <Link to="/tv-shows" className="text-white">TV Shows</Link>
          <Link to="/register" className="text-white">Register</Link>
          <Link to="/login" className="text-white">Login</Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
        />
        <button
          onClick={handleClick}
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition duration-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
