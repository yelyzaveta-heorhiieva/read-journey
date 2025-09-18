import React from 'react';

export interface PaginationBtnProps {
    onClick: () => void;
    disabled: boolean;
    prev?: boolean;
}

export default function PaginationBtn({onClick, disabled, prev}: PaginationBtnProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className='w-8 h-8 flex justify-center items-center rounded-full border border-solid border-[rgba(249,249,249,0.2)] group hover:scale-110 transition-transform'
    >
      <svg
        width='6'
        height='10'
        className={`stroke-[1.5px] stroke-[#f9f9f9] group-disabled:stroke-[rgba(249,249,249,0.2)] fill-transparent ${prev && 'rotate-180'}`}
      >
        <use href='/icons.svg#arrow'></use>
      </svg>
    </button>
  );
};
