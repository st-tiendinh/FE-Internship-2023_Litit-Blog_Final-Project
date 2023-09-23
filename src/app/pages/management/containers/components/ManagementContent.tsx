import { useContext } from 'react';
import { useSelector } from 'react-redux';

import {
  ManagementContext,
  ManagementType,
} from '../../../../../context/ManagementContext';
import { UserManagement } from './UserManagement';

import { RootState } from '../../../../app.reducers';

export const ManagementContent = () => {
  const { managementType } = useContext(ManagementContext)!;
  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );

  switch (managementType) {
    case ManagementType.MY_PROFILE:
      return <UserManagement userInfo={userInfo} />;

    default:
      return;
  }
};
