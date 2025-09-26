import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { getRecommended } from '../redux/books/operations';
import { selectRecommended, selectTotalPages } from '../redux/selectors';
import PaginationBtn from './PaginationBtn';
import BookCard from './BookCard';
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from 'react-router-dom';
import { updateParams } from '../utils/updateParams';

export interface RecomendedBooksProps {}

export default function RecomendedBooks({}: RecomendedBooksProps) {
  const dispatch = useDispatch<AppDispatch>();
  const recommendedBooks = useSelector(selectRecommended);
  const totalPages = useSelector(selectTotalPages);
  const isDesk = useMediaQuery({ minWidth: 1280 });
  const isTab = useMediaQuery({ minWidth: 768 });
  const defaultLimit = isDesk ? 10 : isTab ? 8 : 2;
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || defaultLimit;
  const author = searchParams.get('author') || undefined;
  const title = searchParams.get('title') || undefined;

  useEffect(() => {
    dispatch(
      getRecommended({
        page,
        limit,
        author,
        title,
      }),
    );
  }, [dispatch, page, limit, author, title]);

  return (
    <section className='secondBlock h-[382px] md:h-[663px] xl:h-[651px] '>
      <div className='flex justify-between mb-[22px] md:mb-5'>
        <h2 className='secondBlock-title'>Recommended</h2>
        <ul className='flex gap-2'>
          <li>
            <PaginationBtn
              onClick={() => {
                const filteredEntries = updateParams(
                  { page: page - 1 },
                  searchParams,
                );
                setSearchParams(filteredEntries);
              }}
              disabled={page <= 1}
              prev={true}
            />
          </li>
          <li>
            <PaginationBtn
              onClick={() => {
                const filteredEntries = updateParams(
                  { page: page + 1 },
                  searchParams,
                );
                setSearchParams(filteredEntries);
              }}
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
            <li key={item._id}>
              <BookCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex flex-col justify-center items-center h-[90%]'>
          <p className='mb-10 text-base text-[tomato] text-center md:text-xl'>
            Opps.....there are no recommended books for your request
          </p>
          <button
            type='button'
            onClick={() => {
              const filteredEntries = updateParams(
                {
                  page: 1,
                  author: undefined,
                  title: undefined,
                },
                searchParams,
              );
              setSearchParams(filteredEntries);
            }}
            className='font-bold text-sm leading-[129%] tracking-[0.02em] mx-auto border w-[141px] h-[42px] flex justify-center items-center rounded-[30px] border-solid border-[rgba(249,249,249,0.2)] hover:bg-[#f9f9f9] hover:text-[#1f1f1f] transition-all'
          >
            Show all
          </button>
        </div>
      )}
    </section>
  );
}
