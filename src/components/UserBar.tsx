import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selectors';
import { useMediaQuery } from 'react-responsive';

export interface UserBarProps {}

export default function UserBar({ }: UserBarProps) {
    const user = useSelector(selectUser)
    const isDesk = useMediaQuery({minWidth: 1280})
  return (
    <div className='xl:flex xl:items-center xl:gap-2'>
        <p className='w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#262626] border border-solid border-[rgba(249,249,249,0.2)] font-bold leading-[100%] tracking-[-0.02em] text-center text-[#f9f9f9] md:w-10 md:h-10 md:leading-[112%]'>
          {user?.slice(0, 1)}
          </p>
          {isDesk && <p>{user}</p>}
    </div>
  );
};
