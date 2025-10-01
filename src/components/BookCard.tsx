import { useState } from 'react';
import type { Book, RecommendedBook } from '../types';
import ModalBook from './ModalBook';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { removeBook } from '../redux/books/operations';
import Notification from './Notification';
import DefaultImg from './DefaultImg';

export interface BookCardProps {
  item: RecommendedBook | Book;
  library?: boolean;
  mini?: boolean;
}

export default function BookCard({ item, library, mini }: BookCardProps) {
  const { imageUrl, title, author, _id } = item;
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const [openNofification, setOpenNotification] = useState(false);
  return (
    <>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt='book'
          className={`rounded-lg  mb-2 cursor-pointer ${
            mini ? 'w-[71px] h-[107px] md:max-w-[71px]' : 'w-[137px] h-[208px]'
          }`}
          onClick={() => setOpenModal((prev) => !prev)}
        />
      ) : (
        <DefaultImg
          classNames='w-[137px] h-[208px] mb-2 cursor-pointer'
          onClick={() => setOpenModal((prev) => !prev)}
        />
      )}
      <div
        className={
          mini
            ? 'max-w-[71px]'
            : library
            ? 'min-w-[110px] xs:max-w-[137px] flex justify-between items-center'
            : 'max-w-[110px] xs:max-w-[137px]'
        }
      >
        <div className={library ? 'max-w-[80px] xs:max-w-[95px]' : ''}>
          <h3
            className={`${
              mini ? 'text-[10px] leading-[120%]' : 'text-sm leading-[129%]'
            } font-bold  tracking-[-0.02em] mb-[2px] truncate`}
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
        <Notification
          onClose={() => setOpenNotification(false)}
          library={true}
        />
      )}
    </>
  );
}
