
import type { Routes } from '../types';
import { Navigate } from 'react-router-dom';

export interface RestrictedRouteProps {}

export default function RestrictedRoute({ component: Component, redirectTo = '/', isLoggedIn }: Routes) {
    
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
