import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ page, setPage }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (p) => {
    setPage(p);
    setOpen(false); // close sidebar on mobile after selecting
  };

  return (
    <>
      {/* Hamburger for mobile */}
      {!open && (
        <div className="hamburger" onClick={() => setOpen(true)}>
          ☰
        </div>
      )}

      <div className={`sidebar ${open ? 'open' : ''}`}>
        {/* Close button visible on mobile */}
        <div className="close-btn" onClick={() => setOpen(false)}>
          ×
        </div>

        <div className="sidebar-menu">
          <div
            className={`menu-item ${page === 'home' ? 'active' : ''}`}
            onClick={() => handleClick('home')}
          >
            Home
          </div>
          <div
            className={`menu-item ${page === 'practice' ? 'active' : ''}`}
            onClick={() => handleClick('practice')}
          >
            Practice
          </div>
        </div>
          <div className="sidebar-footer">
            Built with ❤️ by Issac
          </div>
      </div>
    </>
  );
};

export default Sidebar;
