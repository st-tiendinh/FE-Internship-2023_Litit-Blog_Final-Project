import React from 'react';
import { Navigate } from 'react-router-dom';
import { KEYS } from '../../helpers/storageHelper';

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(KEYS.ACCESS_TOKEN);
  return token ? true : false;
};

export const privateRoute = (Wrapped: React.ComponentType<any>) => {
  return (props: any) =>
    isAuthenticated() ? <Wrapped {...props} /> : <Navigate to="/auth/login" />;
};
