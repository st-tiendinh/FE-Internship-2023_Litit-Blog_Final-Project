import React from 'react';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="menu-list">
        <li className="menu-item">
          <div className="d-flex menu">
            <i className="icon icon-profile"></i>
            <span className="menu-label">Profile</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="d-flex menu">
            <i className="icon icon-change-pw"></i>
            <span className="menu-label">Change Password</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="d-flex menu">
            <i className="icon icon-bookmarks"></i>
            <span className="menu-label">Bookmarks</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="d-flex menu">
            <i className="icon icon-draft"></i>
            <span className="menu-label">Drafts</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="d-flex menu">
            <i className="icon icon-recycle-bin"></i>
            <span className="menu-label">Recycle Bin</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
