import React, { useState } from 'react';
import UserNav from './UserNav';
import UserBar from './UserBar';
import { useMediaQuery } from 'react-responsive';
import MobMenu from './MobMenu';
import LogoutBtn from './LogoutBtn';

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const isMob = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='flex justify-between'>
      <p>Logo</p>
      {isMob ? (
        <div className='flex justify-between items-center'>
          <UserBar />
          <button type='button' onClick={() => setShowMenu((prev) => !prev)}>
            Burger
          </button>
          {showMenu && <MobMenu onClick={() => setShowMenu((prev) => !prev)} />}
        </div>
      ) : (
        <div>
          <UserNav />
          <UserBar />
          <LogoutBtn />
        </div>
      )}
    </div>
  );
}
