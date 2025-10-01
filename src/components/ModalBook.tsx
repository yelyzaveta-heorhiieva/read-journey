import { useEffect } from 'react';
import type { RecommendedBook } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { addBookfromRecommended, getOwnBooks } from '../redux/books/operations';
import { useMediaQuery } from 'react-responsive';
import { selectOwnBooks } from '../redux/selectors';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import DefaultImg from './DefaultImg';

export interface ModalBookProps {
  item: RecommendedBook;
  onClose: () => void;
  library?: boolean;
  openNotification?: () => void;
}

export default function ModalBook({
  item,
  onClose,
  library,
  openNotification,
}: ModalBookProps) {
  const { _id, imageUrl, title, author, totalPages } = item;
  const dispatch = useDispatch<AppDispatch>();
  const ownBooks = useSelector(selectOwnBooks);
  const isMob = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    dispatch(getOwnBooks());
  }, [dispatch]);

  const handleClick = () => {
    if (ownBooks.some((item) => item.title === title)) {
      return toast.error('This book is already in your library');
    }
    dispatch(addBookfromRecommended(_id)).unwrap().then(openNotification);
    onClose();
  };


  return (
    <Modal onClose={onClose} classNames='md:w-[500px]'>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt='book'
          width={isMob ? '140' : '153'}
          height={isMob ? '213' : '233'}
          className='rounded-lg w-[140px]  h-[213px] mb-4 mx-auto md:w-[153px] md:h-[233px]'
        />
      ) : (
        <DefaultImg classNames='w-[140px]  h-[213px] mb-4 mx-auto md:w-[153px] md:h-[233px]' />
      )}
      <h3
        className='font-bold text-lg leading-[100%] tracking-[-0.02em] mb-[2px] text-center md:text-xl md:leading-[100%]'
        title={title}
      >
        {title}
      </h3>
      <p className='font-medium text-xs leading-[117%] tracking-[-0.02em] text-[#686868] text-center mb-1 md:text-sm md:leading-[129%]'>
        {author}
      </p>
      <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-center mb-5 md:mb-8'>
        {totalPages} pages
      </p>
      {!library ? (
        <button type='button' onClick={handleClick} className='modalBtn'>
          Add to library
        </button>
      ) : (
        <Link to={`/reading/${_id}`} className='modalBtn'>
          Start reading
        </Link>
      )}
    </Modal>
  );
}
