
import { useSelector } from 'react-redux';
import type { Routes } from '../types';
import { Navigate } from 'react-router-dom';
import { selectIsLogged } from '../redux/selectors';

export interface RestrictedRouteProps {}

export default function RestrictedRoute({ component: Component, redirectTo = '/' }: Routes) {
  const isLoggedIn = useSelector(selectIsLogged);
  
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
