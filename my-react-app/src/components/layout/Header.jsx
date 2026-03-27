
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  const navLinks = isAuthenticated
    ? [
        { to: "/", label: "Home", end: true },
        { to: "/movies", label: "Movies" },
        { to: "/favorites", label: "Favorites" },
        { to: "/tv-shows", label: "TV Shows" },
      ]
    : [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];

  const getNavClass = ({ isActive }) =>
    `text-sm font-medium uppercase tracking-wide transition-all duration-200 relative pb-1 text-white/70 hover:text-white after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-red-600 after:transition-all after:duration-200 after:content-[''] hover:after:w-full ${
      isActive ? "text-white after:w-full" : "after:w-0"
    }`;

  return (
    <div className="p-4 bg-black/90 backdrop-blur flex items-center justify-between sticky top-0 z-50">
      
    
      <div className="flex items-center space-x-4">
        <h1 className="text-[40px] uppercase font-bold text-red-700">
          Movie box
        </h1>

        <nav className="flex items-center space-x-6">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={getNavClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {isAuthenticated && (
        <span className="text-white/70 text-sm">
          Xin chào, {user?.username}
          <button
            onClick={logout}
            className="ml-3 text-red-500 hover:underline"
          >
            Logout
          </button>
        </span>
      )}

 
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

