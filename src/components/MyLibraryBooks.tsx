import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOwnBooks } from '../redux/selectors';
import BookCard from './BookCard';
import type { AppDispatch } from '../redux/store';
import { getOwnBooks } from '../redux/books/operations';
import SelectFilter, { options } from './SelectFilter';
import type { Book, OptionType } from '../types';
import type { SingleValue } from 'react-select';
import books from '../assets/images/1x/books-mob.png';
import booksDesk from '../assets/images/1x/books-desk.png';
import books_2x from '../assets/images/2x/books-mob@2x.png';
import booksDesk_2x from '../assets/images/2x/books-desk@2x.png';
import PaginationBtn from './PaginationBtn';
import { useMediaQuery } from 'react-responsive';

export interface MyLibraryBooksProps {}

export default function MyLibraryBooks({}: MyLibraryBooksProps) {
  const ownBooks = useSelector(selectOwnBooks);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    options[3],
  );
  const isDesk = useMediaQuery({ minWidth: 1280 });
  const isTab = useMediaQuery({ minWidth: 768 });
  const limit = isDesk ? 10 : isTab ? 8 : 2;
  const [page, setPage] = useState(1);

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
    // setPage(1);
  };

  useEffect(() => {
    dispatch(getOwnBooks());
  }, [dispatch]);

  useEffect(() => {
    if (selectedOption?.value === 'all') {
      setFilteredBooks(ownBooks);
    } else {
      const result = ownBooks.filter(
        (item) => item.status === selectedOption?.value,
      );
      setFilteredBooks(result);
    }
  }, [selectedOption, ownBooks]);
  
  useEffect(() => {
    if (totalPages <= 1) setPage(1);
  }, [filteredBooks])

  const startIndex = (page - 1) * limit;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + limit);

  const totalPages = Math.ceil(filteredBooks.length / limit);

  return (
    <section className='w-full secondBlock min-h-[407px] xl:h-[651px] md:h-[663px]'>
      <div className='flex mb-[14px] justify-between'>
        <h2 className='secondBlock-title'>My library</h2>
        <div className='flex flex-col items-end md:flex-row gap-4 md:items-center'>
          <SelectFilter handleChange={handleChange} selected={selectedOption} />
          {filteredBooks.length > 0 && (
            <ul className='flex gap-2'>
              <li>
                <PaginationBtn
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                  prev={true}
                />
              </li>
              <li>
                <PaginationBtn
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
      {filteredBooks.length > 0 ? (
        <ul className='flex gap-[21px] md:flex-wrap md:gap-x-[25px] md:gap-y-[27px] xl:gap-x-5'>
          {paginatedBooks?.map((item) => (
            <li key={item._id}>
              <BookCard item={item} library={true} />
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex flex-col justify-center items-center h-[273px] md:mt-[147px] md:justify-start'>
          <div className='rounded-full bg-[#262626] w-[100px] h-[100px] flex justify-center items-center mb-[10px] md:w-[130px] md:h-[130px] md:mb-5 '>
            <picture>
              <source
                media='(min-width: 768px)'
                srcSet={`${booksDesk} 1x, ${booksDesk_2x} 2x`}
              />
              <source
                media='(max-width: 767px)'
                srcSet={`${books} 1x, ${books_2x} 2x`}
              />
              <img src={books} alt='books' />
            </picture>
          </div>
          {selectedOption?.value === 'all' ? (
            <p className='max-w-[197px] md:max-w-[274px] font-medium text-sm leading-[129%] tracking-[-0.02em] text-center'>
              To start training, add{' '}
              <span className='text-[#686868]'>some of your books</span> or from
              the recommended ones
            </p>
          ) : (
            <p className='max-w-[197px] md:max-w-[274px] font-medium text-sm leading-[129%] tracking-[-0.02em] text-center'>
              There are no books for your request, you can add some and start
              reading now.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
