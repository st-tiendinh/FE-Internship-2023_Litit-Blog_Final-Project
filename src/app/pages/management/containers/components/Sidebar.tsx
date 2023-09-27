import React, { useContext, useEffect, useState } from 'react';
import {
  ManagementContext,
  ManagementType,
} from '../../../../../context/ManagementContext';

export const Sidebar = () => {
  const { managementType, setManagementType } = useContext(ManagementContext)!;
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const activeType = menuItems.filter(
    (item) => item.type === managementType
  )[0];

  const handleChangeManagementType = (type: ManagementType) => {
    setManagementType(type);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="sidebar">
      <div className="d-flex menu-active" onClick={() => setIsOpen(!isOpen)}>
        <i className={`icon ${activeType.icon}`}></i>
        <p className="menu-active-label">{activeType.label}</p>
        <i className="icon icon-arrow-down"></i>
      </div>
      <ul className={`menu-list ${isOpen ? 'active' : ''}`}>
        {menuItems.map((menuItem) => (
          <li
            className={`menu-item ${
              managementType === menuItem.type ? 'active' : ''
            }`}
            key={menuItem.type}
            onClick={() => handleChangeManagementType(menuItem.type)}
          >
            <div className="d-flex menu">
              <i
                className={`icon ${menuItem.icon} ${
                  managementType === menuItem.type ? 'active' : ''
                }`}
              ></i>
              <span className="menu-label">{menuItem.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
