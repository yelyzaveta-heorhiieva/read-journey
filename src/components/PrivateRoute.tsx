import React from 'react';
import { Navigate } from 'react-router-dom';
import type { Routes } from '../types';
import { useSelector } from 'react-redux';
import { selectIsLogged } from '../redux/selectors';


export default function PrivateRoute({ component: Component, redirectTo = '/' }: Routes) {
  const isLoggedIn = useSelector(selectIsLogged)

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
