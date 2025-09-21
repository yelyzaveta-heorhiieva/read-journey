import star from '../assets/images/1x/star-mob.png';
import star_2x from '../assets/images/2x/star-mob@2x.png';
import starDesk from '../assets/images/1x/star-desk.png';
import starDesk_2x from '../assets/images/2x/star-desk@2x.png';
import { useSelector } from 'react-redux';
import { selectBook } from '../redux/selectors';
import { useState } from 'react';
import Statistics from './Statistics';
import Diary from './Diary';

export interface DetailsProps {}

export default function Details({}: DetailsProps) {
  const book = useSelector(selectBook);
  const [statistics, setStatistics] = useState(false);
  

  if (book && (book.progress.length <= 0 || (book.progress.length === 1 && !book.progress[0].finishPage))) {
    return (
      <>
        <h2 className='mb-[14px] font-bold text-lg leading-[100%] tracking-[-0.02em]'>
          Progress
        </h2>
        <p className='font-medium text-sm leading-[129%] tracking-[-0.02em] text-[#686868] mb-5'>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <div className='w-20 h-20 flex items-center justify-center rounded-full bg-[#262626] mx-auto mb-5'>
          <picture>
            <source
              media='(min-width: 768px)'
              srcSet={`${starDesk} 1x, ${starDesk_2x} 2x`}
            />
            <source
              media='(max-width: 767px)'
              srcSet={`${star} 1x, ${star_2x} 2x`}
            />
            <img src={star} alt='books' />
          </picture>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <div className='flex justify-between mb-5'>
          <h2 className='font-bold text-lg leading-[100%] tracking-[-0.02em]'>
            {!statistics ? 'Diary' : 'Statistics'}
          </h2>
          <ul className='flex gap-2'>
            <li>
              <button
                type='button'
                className='w-4 h-4 flex items-center justify-center'
                onClick={() => setStatistics(false)}
              >
                <svg
                  width='16'
                  height='16'
                  className={`stroke-2 ${
                    statistics ? 'stroke-[#686868]' : 'stroke-[#F9F9F9]'
                  } `}
                >
                  <use href='/icons.svg#hourglass'></use>
                </svg>
              </button>
            </li>
            <li>
              <button
                type='button'
                className='w-4 h-4 flex items-center justify-center'
                onClick={() => setStatistics(true)}
              >
                <svg
                  width='16'
                  height='16'
                  className={`stroke-2 fill-transparent ${
                    !statistics ? 'stroke-[#686868]' : 'stroke-[#F9F9F9]'
                  } `}
                >
                  <use
                    href={`/icons.svg#pie-chart${statistics ? '-active' : ''}`}
                  ></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>
        {statistics ? <Statistics /> : <Diary />}
      </div>
    );
  }
}
