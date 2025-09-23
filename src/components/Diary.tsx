import React from 'react';
import { useSelector } from 'react-redux';
import { selectBook } from '../redux/selectors';
import DiaryItem from './DiaryItem';

export interface DiaryProps {}

export default function Diary({}: DiaryProps) {
  const book = useSelector(selectBook);
  const rev = book?.progress ? [...book.progress].reverse() : [];
  return (
    <div className=' max-h-[211px] min-h-[211px] rounded-xl bg-[#262626] w-full relative'>
      <ul className='grid max-h-[211px] min-h-[211px] w-full  overflow-y-auto pt-4 pl-1 pr-[23px]  diary absolute left-[12px]'>
        {rev.map(
          (item, i) =>
            item.finishPage && (
              <li
                key={item.startReading}
                className='self-end pb-[17px] last:pb-4 before:content-[""]  before:w-[2px] before:bg-[#1f1f1f] before:h-full relative before:absolute   before:left-[7px] before:bottom-0 before:z-10'
              >
                <DiaryItem item={item} active={i === 0} />
              </li>
            ),
        )}
      </ul>
    </div>
  );
}
