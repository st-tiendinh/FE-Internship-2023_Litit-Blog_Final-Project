import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { SettingsType } from '../Settings';
import { KEYS, getLS } from '../../../../core/helpers/storageHelper';

export const Sidebar = () => {
  const location = useLocation();
  const userInfo = getLS(KEYS.USER_INFO);
  const isSocial = userInfo !== null ? JSON.parse(userInfo).isSocial : false;

  const menuItems = [
    { type: SettingsType.MY_PROFILE, label: 'Profile', icon: 'icon-profile' },
    {
      type: SettingsType.LIST_FOLLOWERS,
      label: 'Followers',
      icon: 'icon-follower',
    },
    {
      type: SettingsType.LIST_FOLLOWINGS,
      label: 'Followings',
      icon: 'icon-following',
    },
    {
      type: SettingsType.CHANGE_PASSWORD,
      label: 'Change Password',
      icon: 'icon-change-pw',
    },
    {
      type: SettingsType.BOOKMARKS,
      label: 'Bookmarks',
      icon: 'icon-bookmarks',
    },
    { type: SettingsType.DRAFTS, label: 'Drafts', icon: 'icon-draft' },
    {
      type: SettingsType.RECYCLE_BIN,
      label: 'Recycle Bin',
      icon: 'icon-recycle-bin',
    },
  ];

  console.log(isSocial);

  return (
    <div className="sidebar">
      <ul className="menu-list">
        {menuItems.map((menuItem) => (
          <li
            className={`menu-item ${
              location.pathname.split('/').pop() === menuItem.type ? 'active' : ''
            } ${isSocial && menuItem.type === SettingsType.CHANGE_PASSWORD ? 'd-none' : ''}`}
            key={menuItem.type}
          >
            <Link to={`/settings/${menuItem.type}`}>
              <div className="d-flex menu">
                <i
                  className={`icon ${menuItem.icon} ${
                    location.pathname.split('/').pop() === menuItem.type ? 'active' : ''
                  }`}
                ></i>
                <span className="menu-label">{menuItem.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
