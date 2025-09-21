import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import AddReading from '../components/AddReading';
import { useParams } from 'react-router-dom';
import Details from '../components/Details';
import MyBook from '../components/MyBook';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { getBook } from '../redux/books/operations';
import { selectBook, selectCurrentPage } from '../redux/selectors';


export interface ReadingPageProps {}

export default function ReadingPage({ }: ReadingPageProps) {
  const { bookId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const book = useSelector(selectBook)
  const status = (book?.progress[book.progress.length - 1]?.finishPage || book?.progress.length === 0) ? 'start' : 'stop';
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    bookId && dispatch(getBook(bookId))
  }, [dispatch, bookId, currentPage])
  
  return (
    <div className='pages-box'>
      <Dashboard>
        <AddReading id={bookId} status={status} />
        <Details />
      </Dashboard>
      <MyBook status={status} />
    </div>
  );
};
