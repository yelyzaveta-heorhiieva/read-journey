import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { getRecommended } from '../redux/books/operations';
import {
  selectPage,
  selectRecommended,
  selectTotalPages,
} from '../redux/selectors';
import { nextPage, prevPage } from '../redux/books/slice';
import type { FiltersValues } from '../types';
import PaginationBtn from './PaginationBtn';
import BookCard from './BookCard';
import { useMediaQuery } from 'react-responsive';

export interface RecomendedBooksProps {
  filters: FiltersValues | null;
  resetFilters: () => void;
}

export default function RecomendedBooks({
  filters,
  resetFilters,
}: RecomendedBooksProps) {
  const dispatch = useDispatch<AppDispatch>();
  const recommendedBooks = useSelector(selectRecommended);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const isDesk = useMediaQuery({ minWidth: 1280 });
  const isTab = useMediaQuery({ minWidth: 768 });
  const limit = isDesk ? 10 : isTab ? 8 : 2;

  useEffect(() => {
    dispatch(
      getRecommended({
        page,
        limit,
        author: filters?.author?.trim()?.toLowerCase() || undefined,
        title: filters?.title?.trim()?.toLowerCase() || undefined,
      }),
    );
  }, [dispatch, page, limit, filters]);

  return (
    <section className='bg-[#1f1f1f] rounded-[30px] py-10 px-5 h-[382px] md:h-[663px] md:px-10 xl:pb-7 xl:h-[651px] w-full'>
      <div className='flex justify-between mb-[22px] md:mb-5'>
        <h2 className='font-bold text-xl leading-[100%] tracking-[-0.02em] xl:text-[28px] xl:leading-[114%]'>
          Recommended
        </h2>
        <ul className='flex gap-2'>
          <li>
            <PaginationBtn
              onClick={() => dispatch(prevPage())}
              disabled={page <= 1}
              prev={true}
            />
          </li>
          <li>
            <PaginationBtn
              onClick={() => dispatch(nextPage())}
              disabled={
                (totalPages !== null && page >= totalPages) || !totalPages
              }
            />
          </li>
        </ul>
      </div>
      {recommendedBooks.length > 0 ? (
        <ul className='flex gap-[21px] md:flex-wrap md:gap-x-[25px] md:gap-y-[27px] xl:gap-x-5'>
          {recommendedBooks?.map((item) => (
            <BookCard item={item} key={item._id} />
          ))}
        </ul>
      ) : (
        <div className='flex flex-col justify-center items-center h-[90%]'>
          <p className='mb-10 text-base text-[tomato] text-center md:text-xl'>
            Opps.....there are no recommended books for your request
          </p>
          <button
            type='button'
            onClick={resetFilters}
            className='font-bold text-sm leading-[129%] tracking-[0.02em] mx-auto border w-[141px] h-[42px] flex justify-center items-center rounded-[30px] border-solid border-[rgba(249,249,249,0.2)] hover:bg-[#f9f9f9] hover:text-[#1f1f1f] transition-all'
          >
            Show all
          </button>
        </div>
      )}
    </section>
  );
}
