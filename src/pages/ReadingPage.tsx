import  { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import AddReading from '../components/AddReading';
import { useParams } from 'react-router-dom';
import Details from '../components/Details';
import MyBook from '../components/MyBook';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { getBook, startReading, stopReading } from '../redux/books/operations';
import { selectBook, selectCurrentPage } from '../redux/selectors';
import type { FormValues } from '../types';
import type { FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import Notification from '../components/Notification';
import Container from '../components/Container';



export interface ReadingPageProps {}

export default function ReadingPage({ }: ReadingPageProps) {
  const { bookId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const book = useSelector(selectBook)
  const status = (book?.progress[book.progress.length - 1]?.finishPage || book?.progress.length === 0) ? 'start' : 'stop';
  const currentPage = useSelector(selectCurrentPage);
  const [openNofification, setOpenNotification] = useState(false);

   const handleSubmit = (
     values: FormValues,
     actions: FormikHelpers<FormValues>,
   ) => {
     if (bookId && book && currentPage <= book?.totalPages) {
       status === 'stop'
         ? dispatch(stopReading({ id: bookId, page: values.page })).unwrap().then(() => {
           if (values.page === book.totalPages) {
             setOpenNotification(true)
           }
         })
         : dispatch(startReading({ id: bookId, page: values.page }));
     } else {
       toast.error('You have already read this book');
     }
     actions.resetForm();
  };
  
  useEffect(() => {
    bookId && dispatch(getBook(bookId))
  }, [dispatch, bookId])
  
  return (
    <Container classNames='pages-box'>
          <Dashboard>
            <AddReading handleSubmit={handleSubmit} status={status} />
            <Details />
          </Dashboard>
          <MyBook status={status} />
          {openNofification && (
            <Notification onClose={() => setOpenNotification(false)} />
          )}
    </Container>
  );
};
