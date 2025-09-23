import React, { useState } from 'react';
import UserNav from './UserNav';
import UserBar from './UserBar';
import { useMediaQuery } from 'react-responsive';
import MobMenu from './MobMenu';
import LogoutBtn from './LogoutBtn';
import Logo from './Logo';
import Container from './Container';

export interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const isMob = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Container>
      <header className='rounded-[15px] p-5 bg-[#1f1f1f] md:p-4 relative flex justify-between'>
        <Logo isHeader={true} />
        {isMob ? (
          <div className='flex items-center gap-[10px]'>
            <UserBar />
            <button
              type='button'
              onClick={() => setShowMenu((prev) => !prev)}
              className='w-7 h-7 flex items-center justify-center'
            >
              <svg
                width='24'
                height='16'
                className='stroke-[2px] stroke-[#f9f9f9]'
              >
                <use href='/icons.svg#burger'></use>
              </svg>
            </button>
            <MobMenu
              onClick={() => setShowMenu((prev) => !prev)}
              isOpen={showMenu}
            />
          </div>
        ) : (
          <>
            <UserNav />
            <div className='flex md:gap-4 items-center'>
              <UserBar />
              <LogoutBtn />
            </div>
          </>
        )}
      </header>
    </Container>
  );
}
