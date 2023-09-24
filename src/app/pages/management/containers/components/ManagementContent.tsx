import { useContext } from 'react';

import { UserManagement } from './UserManagement';
import { ChangePasswordManagement } from './ChangePasswordManagement';
import { RecycleBin } from './RecycleBin';
import { ListFollowers } from './ListFollowers';
import { ListFollowings } from './ListFollowings';

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

    case ManagementType.LIST_FOLLOWERS:
      return <ListFollowers />;

    case ManagementType.LIST_FOLLOWINGS:
      return <ListFollowings />;

    default:
      return;
  }
};
