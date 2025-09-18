import React from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { logOut } from '../redux/auth/operations';

export interface LogoutBtnProps {}

export default function LogoutBtn({ }: LogoutBtnProps) {
    const dispatch = useDispatch<AppDispatch>();
    
  return (
    <button type='button' onClick={() => dispatch(logOut())}>
      Logout
    </button>
  );
};
