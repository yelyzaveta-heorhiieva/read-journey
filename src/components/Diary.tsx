import { useSelector } from 'react-redux';
import { selectBook } from '../redux/selectors';
import DiaryItem from './DiaryItem';
import type { Progress } from '../types';
import { formatDate } from '../utils/formatDate';

export interface DiaryProps {}

type GroupedEvent = {
  events: Progress[];
  totalPages: number;
};

export default function Diary({}: DiaryProps) {
  const book = useSelector(selectBook);
  const rev = book?.progress ? [...book.progress].reverse() : [];

  
  const grouped = rev.reduce<Record<string, GroupedEvent>>((acc, item) => {
    const dateKey = formatDate(item.finishReading);
    if (item.finishPage) {
      if (!acc[dateKey]) {
      acc[dateKey] = { events: [], totalPages: 0 };
    }
   acc[dateKey].events.push(item);
   acc[dateKey].totalPages += item.finishPage - item.startPage + 1;
 }
    return acc;
  }, {});


  return (
    <div className=' max-h-[211px] min-h-[211px] rounded-xl bg-[#262626] w-full relative md:max-h-[252px] md:min-h-[252px] md:min-w-[321px] xl:min-h-[373px] xl:max-h-[373px] xl:min-w-0'>
      <ul
        className={`grid max-h-[211px] min-h-[211px] w-full  overflow-y-auto pt-4 pl-1 pr-[28px]  diary absolute left-[12px] md:max-h-[252px] md:min-h-[252px]md:max-h-[252px] md:min-h-[252px] md:left-[11px] md:pl-[5px] md:pr-[27px] xl:min-h-[373px] xl:max-h-[373px] xl:pt-5 xl:pl-[9px] xl:pr-[31px]`}
      >
        {Object.entries(grouped).map(([date, items], i) => (
          <li
            key={date}
            className='before:content-[""]  before:w-[2px] before:bg-[#1f1f1f] before:h-full relative before:absolute before:left-[7px] before:bottom-0 before:z-10 md:before:left-2 xl:pb-[22px] xl:last:pb-7'
          >
            <div className='flex justify-between z-20 relative'>
              <div className='flex gap-[9px] md:gap-[10px]'>
                <div
                  className={`flex w-4 h-4 ${
                    i === 0 ? 'bg-[#f9f9f9]' : 'bg-[#686868]'
                  } rounded-[4px] items-center justify-center md:w-5 md:h-5`}
                >
                  <div className='w-2 h-2 bg-[#141414] rounded-[2px] md:w-3 md:h-3'></div>
                </div>
                <h3 className='font-bold text-xs leading-[133%] tracking-[0.02em] mb-[17px] md:text-base md:leading-[112%] xl:mb-7'>
                  {date}
                </h3>
              </div>
              <p className='mr-5 text-[#686868] tracking-[-0.02em] font-medium text-xs leading-[133%] mb-4 md:text-sm md:leading-[129%] md:mb-[18px] xl:mb-[30px]'>
                {items.totalPages} pages
              </p>
            </div>
            <ul className='ml-[25px] xl:ml-[30px]'>
              {items.events.map((item, i) => (
                <li key={item._id} className='flex justify-between mb-[17px]'>
                  <DiaryItem item={item} active={i === 0} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
