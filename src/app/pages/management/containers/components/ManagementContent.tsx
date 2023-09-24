import { useContext } from 'react';

import { UserManagement } from './UserManagement';
import { ChangePasswordManagement } from './ChangePasswordManagement';
import { RecycleBin } from './RecycleBin';
import { Bookmarks } from './Bookmarks';

import {
  ManagementContext,
  ManagementType,
} from '../../../../../context/ManagementContext';

export const ManagementContent = () => {
  const { managementType } = useContext(ManagementContext)!;

  switch (managementType) {
    case ManagementType.MY_PROFILE:
      return <UserManagement />;

    case ManagementType.CHANGE_PASSWORD:
      return <ChangePasswordManagement />;

    case ManagementType.RECYCLE_BIN:
      return <RecycleBin />;

    case ManagementType.BOOKMARKS:
      return <Bookmarks />;

    default:
      return;
  }
};
