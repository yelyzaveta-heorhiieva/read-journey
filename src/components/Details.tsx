import star from '../assets/images/1x/star-mob.png';
import star_2x from '../assets/images/2x/star-mob@2x.png';
import starDesk from '../assets/images/1x/star-desk.png';
import starDesk_2x from '../assets/images/2x/star-desk@2x.png';
import { useSelector } from 'react-redux';
import { selectBook } from '../redux/selectors';
import { useState } from 'react';
import Statistics from './Statistics';
import Diary from './Diary';
import { useMediaQuery } from 'react-responsive';

export interface DetailsProps {}

export default function Details({}: DetailsProps) {
  const book = useSelector(selectBook);
  const [statistics, setStatistics] = useState(false);
  const isMob = useMediaQuery({ maxWidth: 767 })

  

  if (book && (book.progress.length <= 0 || (book.progress.length === 1 && !book.progress[0].finishPage))) {
    return (
      <div className='md:min-w-[305px] md:ml-2'>
        <h2 className='mb-[14px] font-bold text-lg leading-[100%] tracking-[-0.02em] md:text-xl md:leading-[100%]'>
          Progress
        </h2>
        <p className='font-medium text-sm leading-[129%] tracking-[-0.02em] text-[#686868] mb-5 md:mb-[50px] xl:mb-[60px]'>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <div className='w-20 h-20 flex items-center justify-center rounded-full bg-[#262626] mx-auto mb-5 md:w-[100px] md:h-[100px] md:mb-[52px]'>
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
      </div>
    );
  } else {
    return (
      <div className='md:min-w-[305px] md:ml-2 xl:ml-0'>
        <div className='flex justify-between mb-5'>
          <h2 className='font-bold text-lg leading-[100%] tracking-[-0.02em] md:text-xl md:leading-[100%]'>
            {!statistics ? 'Diary' : 'Statistics'}
          </h2>
          <ul className='flex gap-2'>
            <li>
              <button
                type='button'
                className='w-4 h-4 flex items-center justify-center md:w-5 md:h-5'
                onClick={() => setStatistics(false)}
              >
                <svg
                  width={isMob ? 16 : 20}
                  height={isMob ? 16 : 20}
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
                className='w-4 h-4 flex items-center justify-center md:w-5 md:h-5'
                onClick={() => setStatistics(true)}
              >
                <svg
                  width={isMob ? 16 : 20}
                  height={isMob ? 16 : 20}
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
