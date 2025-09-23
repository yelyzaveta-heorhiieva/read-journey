import React from 'react';
import type { Book, Progress } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { deleteProgress } from '../redux/books/operations';
import { selectBook, selectCurrentPage } from '../redux/selectors';
import { useMediaQuery } from 'react-responsive';

export interface DiaryItemProps {
  item: Progress;
  active: boolean;
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
  const speed =
    (pageAmount * 60) / diffDates(item.finishReading, item.startReading);
  const isMob = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <div>
        <p className='font-medium text-sm leading-[129%] tracking-[-0.02em] mb-1 md:text-xl md:leading-[100%] xl:mb-2'>
          {progress.toFixed(1)}%
        </p>
        <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-[#686868] md:text-xs md:leading-[117%]'>
          {time} minutes
        </p>
      </div>
      <div className='flex gap-[6px] md:gap-2'>
        <div className='max-w-[50px] text-[#686868] tracking-[-0.02em] font-medium md:min-w-[60px]'>
          <p className='text-[10px] leading-[120%] max-w-11 md:max-w-[60px] text-center md:text-xs md:leading-[117%]'>
            <svg
              width={isMob ? 44 : 60}
              height={isMob ? 18 : 25}
              className='mb-[7px]'
            >
              <use href='/icons.svg#block'></use>
            </svg>
            {Math.round(speed)} pages per hour
          </p>
        </div>
        <button
          type='button'
          disabled={(!!book && currentPage >= book.totalPages) || !active}
          onClick={() => {
            if (book && item._id && currentPage < book?.totalPages) {
              dispatch(
                deleteProgress({ bookId: book._id, readingId: item._id }),
              );
            }
          }}
          className='mt-[2px] md:mt-[6px] w-[14px] h-[14px] flex items-center justify-center disabled:cursor-not-allowed'
        >
          <svg width='14' height='14' className='stroke-[#686868]'>
            <use href='/icons.svg#trash'></use>
          </svg>
        </button>
      </div>
    </>
  );
}
