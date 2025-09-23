import React from 'react';
import type { Progress } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { deleteProgress } from '../redux/books/operations';
import { selectBook, selectCurrentPage } from '../redux/selectors';


export interface DiaryItemProps {
  item: Progress;
  active: boolean;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function diffDates(dateString1: string, dateString2: string) {
  const d1: Date = new Date(dateString1);
  const d2: Date = new Date(dateString2);

  const diffMs = Math.abs(d1.getTime() - d2.getTime());

  return Number((diffMs / (1000 * 60)).toFixed(2));
}

export default function DiaryItem({ item, active }: DiaryItemProps) {
  const time = Math.round(diffDates(item.finishReading, item.startReading));
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(selectCurrentPage);
  const book = useSelector(selectBook);
  const progress =
    book && item
      ? ((item.finishPage - item.startPage + 1) * 100) / book.totalPages
      : 0;
  const pageAmount = item.finishPage - item.startPage + 1;
  const speed = pageAmount * 60 / diffDates(item.finishReading, item.startReading) 

  return (
    <div className='flex justify-between z-20 relative'>
      <div className='flex gap-[9px]'>
        <div
          className={`flex w-4 h-4 ${
            active ? 'bg-[#f9f9f9]' : 'bg-[#686868]'
          } rounded-[4px] items-center justify-center `}
        >
          <div className='w-2 h-2 bg-[#141414] rounded-[2px]'></div>
        </div>
        <div>
          <h3 className='font-bold text-xs leading-[133%] tracking-[0.02em] mb-[17px]'>
            {formatDate(item.startReading)}
          </h3>
          <p className='font-medium text-sm leading-[129%] tracking-[-0.02em] mb-1'>
            {progress.toFixed(1)}%
          </p>
          <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-[#686868]'>
            {time} minutes
          </p>
        </div>
      </div>
      <div className='flex gap-[6px] items-center'>
        <div className='max-w-[50px] text-[#686868] tracking-[-0.02em] font-medium'>
          <p className='text-xs leading-[133%] mb-4'>
            {pageAmount} pages
          </p>
          <p className='text-[10px] leading-[120%] max-w-11'>
            <svg width='44' height='18' className='mb-[7px]'>
              <use href='/icons.svg#block'></use>
            </svg>
            {Math.round(speed)} pages per hour
          </p>
        </div>
        <button
          type='button'
          disabled={!!book && currentPage >= book.totalPages || !active}
          onClick={() => {
            if (book && item._id && currentPage < book?.totalPages) {
              dispatch(
                deleteProgress({ bookId: book._id, readingId: item._id }),
              );
            }
          }}
          className='w-[14px] h-[14px] flex items-center justify-center disabled:cursor-not-allowed'
        >
          <svg width='14' height='14' className='stroke-[#686868]'>
            <use href='/icons.svg#trash'></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
