import React, { createContext, useState, ReactNode } from 'react';

export enum ManagementType {
  MY_PROFILE = 'my-profile',
  LIST_FOLLOWERS = 'list-followers',
  LIST_FOLLOWINGS = 'list-followings',
  CHANGE_PASSWORD = 'change-password',
  BOOKMARKS = 'bookmarks',
  DRAFTS = 'drafts',
  RECYCLE_BIN = 'recycle-bin',
}

interface ManagementContextType {
  managementType: ManagementType;
  setManagementType: React.Dispatch<React.SetStateAction<ManagementType>>;
}

export const ManagementContext = createContext<
  ManagementContextType | undefined
>(undefined);

interface ManagementProviderProps {
  children: ReactNode;
}

export const ManagementProvider: React.FC<ManagementProviderProps> = ({
  children,
}) => {
  const [managementType, setManagementType] = useState<ManagementType>(
    ManagementType.MY_PROFILE
  );

  return (
    <ManagementContext.Provider value={{ managementType, setManagementType }}>
      {children}
    </ManagementContext.Provider>
  );
};
