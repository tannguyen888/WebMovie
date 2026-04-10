
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const [value, setValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      setMenuOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleClick();
  };

  const navLinks = isAuthenticated
    ? [
        { to: "/", label: "Home", end: true },
        { to: "/movies", label: "Movies" },
        { to: "/favorites", label: "Favorites" },
        { to: "/tv-shows", label: "TV Shows" },
        { to: "/admin/movies", label: "Admin" },
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
    <header className="bg-black/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl md:text-[40px] uppercase font-bold text-red-700 shrink-0">
          Movie box
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
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

        {/* Desktop search + user */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="px-3 py-1.5 rounded-l-md border border-gray-600 bg-gray-800 text-white text-sm focus:outline-none focus:border-red-500 w-40 lg:w-56"
            />
            <button
              onClick={handleClick}
              className="bg-red-700 text-white px-3 py-1.5 rounded-r-md hover:bg-red-800 transition text-sm"
            >
              Search
            </button>
          </div>

          {isAuthenticated && (
            <span className="text-white/70 text-sm whitespace-nowrap">
              {user?.username}
              <button
                onClick={logout}
                className="ml-2 text-red-500 hover:underline"
              >
                Logout
              </button>
            </span>
          )}
        </div>

        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800 px-4 pb-4 space-y-3">
          <nav className="flex flex-col space-y-2 pt-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={getNavClass}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex mt-3">
            <input
              type="text"
              placeholder="Search..."
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 rounded-l-md border border-gray-600 bg-gray-800 text-white text-sm focus:outline-none"
            />
            <button
              onClick={handleClick}
              className="bg-red-700 text-white px-4 py-2 rounded-r-md hover:bg-red-800 transition text-sm"
            >
              Search
            </button>
          </div>

          {isAuthenticated && (
            <div className="flex items-center justify-between text-sm pt-2">
              <span className="text-white/70">Xin chào, {user?.username}</span>
              <button onClick={logout} className="text-red-500 hover:underline">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

