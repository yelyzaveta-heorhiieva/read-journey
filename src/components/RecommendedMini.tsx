import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { selectRecommended } from '../redux/selectors';
import { getRecommended } from '../redux/books/operations';
import defaultImg from '../assets/images/1x/book-mob.png';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export interface RecommendedMiniProps {}

export default function RecommendedMini({}: RecommendedMiniProps) {
  const dispatch = useDispatch<AppDispatch>();
  const recommendedBooks = useSelector(selectRecommended);
  const isMob = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    dispatch(
      getRecommended({
        limit: 3,
      }),
    );
  }, [dispatch]);

  return (
    <div className='bg-[#262626] rounded-xl p-5 w-full'>
      <h3 className='font-bold text-lg leading-[100%] tracking-[-0.02em] text-[#e3e3e3] mb-[14px] md:text-xl md:leading-[100%] md:mb-5'>
        Recommended books
      </h3>
      <ul className='grid grid-cols-3 gap-5 mb-[11px] md:mb-5 xl:mb-[14px]'>
        {recommendedBooks?.map(({ imageUrl, title, author, _id }) => {
          return (
            <li key={_id}>
              <img
                src={imageUrl || defaultImg}
                alt='book'
                className='rounded-lg mb-2 cursor-pointer min-w-[71px] h-[107px] md:max-w-[71px]'
              />
              <div className='md:max-w-[71px]'>
                <h3
                  className='font-bold tracking-[-0.02em] truncate mb-[2px] text-[10px] leading-[120%]  text-[#e3e3e3]'
                  title={title}
                >
                  {title}
                </h3>
                <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-[#686868]'>
                  {author}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <Link
        to='/recommended'
        className='group hover:text-[#E3E3E3] transition-all flex justify-between items-end  font-medium text-xs leading-[117%] tracking-[-0.02em] underline text-[#686868] text-decoration-skip-none md:text-sm md:leading-[129%]'
      >
        Home
        <svg
          width={isMob ? '20' : '24'}
          height={isMob ? '20' : '24'}
          className='stroke-[#E3E3E3] stroke-[1.5] group-hover:scale-110 transition-all'
        >
          <use href='/icons.svg#arrow-right'></use>
        </svg>
      </Link>
    </div>
  );
}
