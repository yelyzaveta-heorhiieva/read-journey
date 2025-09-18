import React from 'react';
import UserNav from './UserNav';
import LogoutBtn from './LogoutBtn';

export interface MobMenuProps {
    onClick: ()=>void
}

export default function MobMenu({onClick}: MobMenuProps) {
  return (
      <div className='bg-[grey]'>
          <button type='button' onClick={onClick}>CloseBtn</button>
          <UserNav />
          <LogoutBtn />
    </div>
  );
};
