import React from 'react';
import UserNav from './UserNav';
import LogoutBtn from './LogoutBtn';

export interface MobMenuProps {
    onClick: () => void;
    isOpen: boolean;
}

export default function MobMenu({onClick, isOpen }: MobMenuProps) {
  return (
    <div
      className={`fixed h-[100%] w-[52%] top-0 right-0 flex flex-col justify-end items-center py-10 ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[100%] opacity-0'
      } transition-all duration-500 bg-[#262626]`}
    >
      <button type='button' onClick={onClick} className='w-7 h-7 flex items-center justify-center absolute top-[34px] right-10'>
        <svg width='16' height='16' className='stroke-[2px] stroke-[#f9f9f9]'>
          <use href='/icons.svg#close'></use>
        </svg>
      </button>
      <UserNav />
      <LogoutBtn />
    </div>
  );
};
