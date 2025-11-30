import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatPanel from './ChatPanel';
import './Header.css';

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [localQuery, setLocalQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.isLoggedIn) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    function handleDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('favorites');
    setUser(null);
    navigate('/signin');
    // avoid full reload in SPA; only use if you need to force refresh
    // window.location.reload();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      onSearch(localQuery.trim());
    }
  };

  const handleMenuClick = (item) => {
    setDropdownOpen(false);
    if (item === 'learn') navigate('/learn');
    if (item === 'practice') navigate('/practice');
    if (item === 'tutorials') navigate('/tutorials');
    if (item === 'resources') navigate('/resources');
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">

          {/* LOGO */}
          <Link to="/category/all" className="logo logo-with-image">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.w_SOPzmjn25KbK6H6VAIpwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="logo"
              className="logo-icon"
            />
            <span className="logo-text">TalentCo</span>
          </Link>

          {/* SEARCH */}
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="search"
              placeholder="Search by name, skill, or specialty..."
              className="search-input"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
          </form>

          {/* NAVIGATION */}
          <nav className="header-nav">

            {/* THREE DOTS MENU */}
            <div
              className="dots-menu"
              ref={menuRef}
              onMouseEnter={() => setDropdownOpen(true)}
            >
              <button
                className="dots-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen((s) => !s);
                }}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                type="button"
              >
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </button>

              <div
                className={`dots-dropdown ${dropdownOpen ? 'open' : ''}`}
                role="menu"
                aria-hidden={!dropdownOpen}
              >
                <button className="dropdown-item" onClick={() => handleMenuClick('learn')}>
                  Learn
                </button>
                <button className="dropdown-item" onClick={() => handleMenuClick('practice')}>
                  Practice
                </button>
                <button className="dropdown-item" onClick={() => handleMenuClick('tutorials')}>
                  Tutorials
                </button>
                <button className="dropdown-item" onClick={() => handleMenuClick('resources')}>
                  Resources
                </button>
              </div>
            </div>

            {/* USER SECTION */}
            {user ? (
              <>
                <Link to="/favorites" className="header-link star-border">
                  <span className="star-icon">★</span> My Favorites
                </Link>

                <Link to="/dashboard" className="header-link welcome-message profile-border">
                  <span className="profile-icon">👤</span>
                  Welcome, {user.name}
                </Link>

                <button onClick={handleSignOut} className="header-button signout">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/signin" className="header-button signin">
                Sign In
              </Link>
            )}

            {/* ChatGPT floating button (opens side panel) */}
            <button
              className="chatgpt-btn-header"
              onClick={() => setIsChatOpen(true)}
              title="Open assistant"
            >
              💬 GPT
            </button>
          </nav>
        </div>
      </header>

      {/* Chat panel component (mounted outside header so it can be fixed) */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Header;
