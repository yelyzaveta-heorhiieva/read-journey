
import {  useDispatch, useSelector } from 'react-redux';
import { selectOwnBooks, selectRecommended } from '../redux/selectors';
import Dashboard from '../components/Dashboard';
import MyLibraryBooks from '../components/MyLibraryBooks';
import AddBook from '../components/AddBook';
import type { AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { getRecommended } from '../redux/books/operations';
import BookCard from '../components/BookCard';
import RecommendedMini from '../components/RecommendedMini';


export interface LibraryPageProps {}

export default function LibraryPage({ }: LibraryPageProps) {
  const ownBooks = useSelector(selectOwnBooks)
 
  
  return (
    <div className='pages-box'>
      <Dashboard>
        <AddBook />
        <RecommendedMini />
      </Dashboard>
      <MyLibraryBooks />
    </div>
  );
};
