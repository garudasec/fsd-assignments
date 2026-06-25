// Navigation Bar
// Links - home , course, bookmarks
// Also handles light/dark theme toggle

import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { BookmarkContext } from "../context/BookmarkContext";

function Navbar() {
  const { bookmarks } = useContext(BookmarkContext);
  const [darkMode, setDarkMode] = useState(false);

  // Read saved theme on first load so it stays consistent across pages
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  function toggleTheme() {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <div className="navbar">
      <Link className="navbar-logo" to="/">
        <span className="logo-icon">TC</span>
        <span className="logo-text">Tech Courses Hub</span>
      </Link>

      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/courses">Courses</Link>
        <Link className="nav-link" to="/bookmarks">Bookmarks ({bookmarks.length})</Link>
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}

export default Navbar;