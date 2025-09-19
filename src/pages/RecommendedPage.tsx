import { useMediaQuery } from 'react-responsive';
import Dashboard from '../components/Dashboard';
import Filters from '../components/Filters';
import RecomendedBooks from '../components/RecommendedBooks';
import WorkoutBlock from '../components/WorkoutBlock';
import books from '../assets/images/1x/books-mob.png';
import books_2x from '../assets/images/2x/books-mob@2x.png';
import type { FiltersValues } from '../types';
import type { FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { getRecommended } from '../redux/books/operations';
import { useState } from 'react';
import { resetPage } from '../redux/books/slice';

export interface RecomendedPageProps {}

export default function RecomendedPage({}: RecomendedPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isDesk = useMediaQuery({ minWidth: 1280 });
  const [filters, setFilters] = useState<FiltersValues | null>(null)
  const handleSubmit = (
    values: FiltersValues,
    actions: FormikHelpers<FiltersValues>,
  ) => {
    setFilters(values)
    dispatch(resetPage())
    actions.resetForm();
  };

  return (
    <div className='mt-1 flex flex-col gap-[10px] md:mt-4 md:gap-4 xl:flex-row'>
      <Dashboard>
        <Filters handleSubmit={handleSubmit} />
        <WorkoutBlock />
        {isDesk && (
          <div className='bg-[#262626] px-5 pt-[15px] pb-[14px] rounded-xl flex gap-[14px] items-center'>
            <img
              srcSet={`${books} 1x, ${books_2x} 2x`}
              src={books}
              alt='books'
              width='40'
              height='40'
              className='w-10 h-10'
            />
            <p className='font-medium text-sm leading-[129%] tracking-[-0.02em] text-[#686868]'>
              "Books are <span className='text-[#f9f9f9]'>windows</span> to the
              world, and reading is a journey into the unknown."
            </p>
          </div>
        )}
      </Dashboard>
      <RecomendedBooks filters={filters} resetFilters={()=>setFilters(null)}/>
    </div>
  );
}
