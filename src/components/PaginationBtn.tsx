import React from 'react';
import { useMediaQuery } from 'react-responsive';

export interface PaginationBtnProps {
    onClick: () => void;
    disabled: boolean;
    prev?: boolean;
}

export default function PaginationBtn({ onClick, disabled, prev }: PaginationBtnProps) {
  const isMob = useMediaQuery({maxWidth: 767})
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className='w-8 h-8 flex justify-center items-center rounded-full border border-solid border-[rgba(249,249,249,0.2)] group hover:scale-110 transition-transform md:w-10 md:h-10'
    >
      <svg
        width={isMob ? '6' : '8'}
        height={isMob ? '10' : '12'}
        className={`stroke-[1.5px] stroke-[#f9f9f9] group-disabled:stroke-[rgba(249,249,249,0.2)] fill-transparent ${
          prev && 'rotate-180'
        }`}
      >
        <use href='/icons.svg#arrow'></use>
      </svg>
    </button>
  );
};
