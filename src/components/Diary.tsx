import React from 'react';
import { useSelector } from 'react-redux';
import { selectBook } from '../redux/selectors';
import DiaryItem from './DiaryItem';

export interface DiaryProps {}

export default function Diary({}: DiaryProps) {
  const book = useSelector(selectBook);
  const rev = book?.progress ? [...book.progress].reverse() : [];
  return (
    <ul className=' max-h-[211px] min-h-[211px] rounded-xl overflow-y-auto px-4 pt-4 bg-[#262626] '>
      {rev.map(
        (item) =>
          item.finishPage && (
            <li
              key={item.startReading}
              className='pb-[17px] last:pb-4 [&:first-child>div>div>div.special]:bg-[#f9f9f9] before:content-[""]  before:w-[2px] before:bg-[#1f1f1f] before:h-full relative before:absolute   before:left-[7px] before:bottom-0 before:z-10'
            >
              <DiaryItem item={item} />
            </li>
          ),
      )}
    </ul>
  );
}
