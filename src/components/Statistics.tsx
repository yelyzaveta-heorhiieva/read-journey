import React from 'react';
import ProgressCircle from './ProgressCircle';
import { useSelector } from 'react-redux';
import { selectBook } from '../redux/selectors';

export interface StatisticsProps {}

export default function Statistics({}: StatisticsProps) {
  const book = useSelector(selectBook);
  const progress = () => {
    if (!book) return;
    let result;
    if (book.progress[book.progress.length - 1].finishPage) {
  result =
    (book.progress[book.progress.length - 1].finishPage * 100) /
    book.totalPages;
    } else {
      result =
        (book.progress[book.progress.length - 2].finishPage * 100) /
        book.totalPages;
    }
    
    return result.toFixed(2);

  }

  const finishPage = book && book.progress[book.progress.length - 1].finishPage;

  return (
    <div className='bg-[#262626] rounded-xl p-5'>
      <ProgressCircle
        percentage={Number(progress())}
        colour='green'
      />
        <div className='ml-[109px] max-w-[66px]'>
          <p className="before:content-[''] before:block before:rounded before:w-[14px] before:h-[14px] before:bg-[#30b94d] font-medium text-sm leading-[129%] tracking-[-0.02em] relative before:absolute before:left-[-29px] before:top-1/2 before:translate-y-[-50%] mb-1">
            {progress()}%
          </p>
          <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-[#686868]'>{finishPage} pages read</p>
        </div>
    </div>
  );
}
