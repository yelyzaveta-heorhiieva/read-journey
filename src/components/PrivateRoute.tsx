import React from 'react';
import { Navigate } from 'react-router-dom';
import type { Routes } from '../types';


export default function PrivateRoute({ component: Component, redirectTo = '/', isLoggedIn }: Routes) {

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
