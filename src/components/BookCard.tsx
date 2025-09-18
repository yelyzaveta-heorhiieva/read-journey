import React, { useState } from 'react';
import type { Book } from '../types';
import ModalBook from './ModalBook';

export interface BookCardProps {
  item: Book;
}

export default function BookCard({ item }: BookCardProps) {
  const { imageUrl, title, author } = item;
  const [openModal, setOpenModal] = useState(false);
  return (
    <li className='max-w-[137px] '>
      <img
        src={imageUrl}
        alt='book'
        width='137'
        height='208'
        className='rounded-lg w-[137px]  h-[208px] mb-2 cursor-pointer'
        onClick={() => setOpenModal((prev) => !prev)}
      />
      <h3
        className='font-bold text-sm leading-[129%] tracking-[-0.02em] mb-[2px] text-nowrap truncate '
        title={title}
      >
        {title}
      </h3>
      <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-[#686868]'>
        {author}
      </p>
      {openModal && (
        <ModalBook item={item} onClose={() => setOpenModal((prev) => !prev)} />
      )}
    </li>
  );
}
