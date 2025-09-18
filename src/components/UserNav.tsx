import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export interface UserNavProps {}

export default function UserNav({}: UserNavProps) {
  return (
    <div>
      <ul>
        <li>
          <NavLink to='recomended'>Home</NavLink>
        </li>
        <li>
          <NavLink to='library'>My library</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
