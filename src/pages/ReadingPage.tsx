import React from 'react';
import Dashboard from '../components/Dashboard';
import AddReading from '../components/AddReading';
import { useParams } from 'react-router-dom';

export interface ReadingPageProps {}

export default function ReadingPage({ }: ReadingPageProps) {
  const { bookId } = useParams();
  
  return (
    <div className='pages-box'>
      <Dashboard>
        <AddReading id={bookId} />
      </Dashboard>
    </div>
  );
};
