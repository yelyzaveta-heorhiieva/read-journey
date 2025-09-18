import React from 'react';
import { useMediaQuery } from 'react-responsive';

export interface LogoProps {
  classNames?: string;
  isHeader?: boolean;
}

export default function Logo({classNames, isHeader }: LogoProps) {
      const isMob = useMediaQuery({
        query: '(max-width: 767px)',
      });
   const isDesk = useMediaQuery({
     query: '(min-width: 1280px)',
   });
  
  const shouldShow = (isHeader && isDesk) || (!isHeader && !isMob);
  
  return (
    <div className={`flex gap-1 items-center ${classNames || ''}`}>
      <svg width='42' height='17' className='fill-[#F9F9F9] '>
        <use href='/icons.svg#logo'></use>
      </svg>{' '}
      {shouldShow && (
        <p className='font-bold text-lg leading-[100%] tracking-[0.02em] uppercase'>
          read journey
        </p>
      )}
    </div>
  );
};
