import React from 'react';
import { useSelector } from 'react-redux';
import { selectBook } from '../redux/selectors';
import defaultImg from '../assets/images/1x/book-mob.png';

export interface MyBookProps {
    status: 'start' | 'stop'
}

export default function MyBook({status}: MyBookProps) {
  const book = useSelector(selectBook);

  return (
    <section className='secondBlock'>
      <h2 className='secondBlock-title mb-10'>My reading</h2>
      <img
        src={book?.imageUrl || defaultImg}
        alt='book'
        width='137'
        height='208'
        className='rounded-lg w-[137px] h-[208px] mb-[10px] mx-auto'
      />

      <h3
        className='font-bold text-sm leading-[129%] tracking-[-0.02em] mb-[5px] text-center'
        title={book?.title}
      >
        {book?.title}
      </h3>
      <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-[#686868] text-center mb-5'>
        {book?.author}
          </p>
          <svg width='40' height='40' className='mx-auto'><use href={`/icons.svg#${status === 'stop' ? 'stop' : 'play'}`}></use></svg>
    </section>
  );
}
