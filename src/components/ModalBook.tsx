import React, { useEffect } from 'react';
import defoltImg from '../assets/images/1x/book-mob.png';
import type { Book } from '../types';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { addBookfromRecommended } from '../redux/books/operations';

export interface ModalBookProps {
  item: Book;
  onClose: () => void;
}

export default function ModalBook({ item, onClose }: ModalBookProps) {
  const { _id, imageUrl, title, author, totalPages } = item;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-[rgba(20,20,20,0.6)] z-[1010]'
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        (e.target as HTMLElement) === e.currentTarget && onClose()
      }
    >
      <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 border w-[335px] p-10  rounded-xl border-solid border-[rgba(104,104,104,0.2)] bg-[#1f1f1f] z-[1100] '>
        <button
          type='button'
          onClick={onClose}
          className='absolute top-4 right-4 w-[22px] h-[22px] flex justify-center items-center'
        >
          <svg width='14' height='14' className='stroke-[#f9f9f9] stroke-[2]'>
            <use href='/icons.svg#close'></use>
          </svg>
        </button>
        <img
          src={imageUrl || defoltImg}
          alt='book'
          width='140'
          height='213'
          className='rounded-lg w-[140px]  h-[213px] mb-4 mx-auto'
        />
        <h3
          className='font-bold text-lg leading-[100%] tracking-[-0.02em] mb-[2px] text-center'
          title={title}
        >
          {title}
        </h3>
        <p className='font-medium text-xs leading-[117%] tracking-[-0.02em] text-[#686868] text-center mb-1'>
          {author}
        </p>
        <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-center mb-5'>
          {totalPages} pages
        </p>
        <button
          type='button'
          onClick={() => dispatch(addBookfromRecommended(_id))}
          className='font-bold text-sm leading-[129%] tracking-[0.02em] mx-auto border w-[141px] h-[42px] flex justify-center items-center rounded-[30px] border-solid border-[rgba(249,249,249,0.2)] hover:bg-[#f9f9f9] hover:text-[#1f1f1f] transition-all'
        >
          Add to library
        </button>
      </div>
    </div>
  );
}
