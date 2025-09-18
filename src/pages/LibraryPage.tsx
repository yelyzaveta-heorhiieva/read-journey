import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOwnBooks } from '../redux/selectors';
import { getOwnBooks } from '../redux/books/operations';
import type { AppDispatch } from '../redux/store';

export interface LibraryPageProps {}

export default function LibraryPage({ }: LibraryPageProps) {
  const ownBooks = useSelector(selectOwnBooks)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOwnBooks())
  }, [])

  console.log(ownBooks);
  
  return (
    <div>
      <p>LibraryPage</p>
    </div>
  );
};
