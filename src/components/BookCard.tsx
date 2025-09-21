import React, { useState } from 'react';
import type { Book, RecommendedBook } from '../types';
import ModalBook from './ModalBook';
import defaultImg from '../assets/images/1x/book-mob.png';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { removeBook } from '../redux/books/operations';
import AddBookNotification from './AddBookNotification';

export interface BookCardProps {
  item: RecommendedBook | Book;
  library?: boolean;
}

export default function BookCard({ item, library }: BookCardProps) {
  const { imageUrl, title, author, _id } = item;
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const [openNofification, setOpenNotification] = useState(false);
  return (
    <>
      <img
        src={imageUrl || defaultImg}
        alt='book'
        width='137'
        height='208'
        className='rounded-lg w-[137px]  h-[208px] mb-2 cursor-pointer'
        onClick={() => setOpenModal((prev) => !prev)}
      />
      <div className='flex justify-between items-center'>
        <div className={`${library ? 'max-w-[95px]' : 'max-w-[137px]'}`}>
          <h3
            className='font-bold text-sm leading-[129%] tracking-[-0.02em] mb-[2px] text-nowrap truncate '
            title={title}
          >
            {title}
          </h3>
          <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-[#686868]'>
            {author}
          </p>
        </div>
        {library && (
          <button
            type='button'
            onClick={() => dispatch(removeBook(_id))}
            className='w-7 h-7 border border-solid border-[rgba(232,80,80,0.2)] rounded-full bg-[rgba(232,80,80,0.1)] flex items-center justify-center'
          >
            <svg width='14' height='14' className='stroke-[#e85050]'>
              <use href='/icons.svg#trash'></use>
            </svg>
          </button>
        )}
      </div>
      {openModal && (
        <ModalBook
          item={item}
          onClose={() => setOpenModal((prev) => !prev)}
          openNotification={() => setOpenNotification(true)}
          library={library}
        />
      )}
      {openNofification && (
        <AddBookNotification onClose={() => setOpenNotification(false)} />
      )}
    </>
  );
}
