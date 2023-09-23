import React, { useContext } from 'react';
import {
  ManagementContext,
  ManagementType,
} from '../../../../../context/ManagementContext';

export const Sidebar = () => {
  const { managementType, setManagementType } = useContext(ManagementContext)!;

  const menuItems = [
    { type: ManagementType.MY_PROFILE, label: 'Profile', icon: 'icon-profile' },
    {
      type: ManagementType.LIST_FOLLOWERS,
      label: 'Followers',
      icon: 'icon-follower',
    },
    {
      type: ManagementType.LIST_FOLLOWINGS,
      label: 'Followings',
      icon: 'icon-following',
    },
    {
      type: ManagementType.CHANGE_PASSWORD,
      label: 'Change Password',
      icon: 'icon-change-pw',
    },
    {
      type: ManagementType.BOOKMARKS,
      label: 'Bookmarks',
      icon: 'icon-bookmarks',
    },
    { type: ManagementType.DRAFTS, label: 'Drafts', icon: 'icon-draft' },
    {
      type: ManagementType.RECYCLE_BIN,
      label: 'Recycle Bin',
      icon: 'icon-recycle-bin',
    },
  ];

  const handleChangeManagementType = (type: ManagementType) => {
    setManagementType(type);
  };

  return (
    <div className="sidebar">
      <ul className="menu-list">
        {menuItems.map((menuItem) => (
          <li
            className={`menu-item ${
              managementType === menuItem.type ? 'active' : ''
            }`}
            key={menuItem.type}
            onClick={() => handleChangeManagementType(menuItem.type)}
          >
            <div className="d-flex menu">
              <i className={`icon ${menuItem.icon}`}></i>
              <span className="menu-label">{menuItem.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
