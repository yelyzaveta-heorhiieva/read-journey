
import { useSelector } from 'react-redux';
import { selectBook } from '../redux/selectors';
import { useMediaQuery } from 'react-responsive';
import DefaultImg from './DefaultImg';

export interface MyBookProps {
  status: 'start' | 'stop';
}

export default function MyBook({ status }: MyBookProps) {
  const book = useSelector(selectBook);
  const isMob = useMediaQuery({ maxWidth: 767 });
  const hoursLeft = book && book.timeLeftToRead?.hours;
  const minutesLeft =
    book &&
    Math.round(
      book.timeLeftToRead?.minutes + book.timeLeftToRead?.seconds / 60,
    );

  return (
    <section className='secondBlock md:!pb-[25px]'>
      <div className='flex justify-between mb-10 md:mb-8 xl:mb-11'>
        <h2 className='secondBlock-title '>My reading</h2>
        {book?.timeLeftToRead && status === 'start' && (
          <p className='font-medium text-xs leading-[133%] tracking-[-0.02em] text-[#686868] md:text-sm md:leading-[129%]'>
            {`${hoursLeft && hoursLeft > 0 ? hoursLeft + ' hours and ' : ''}`}
            {`${
              minutesLeft && minutesLeft > 0
                ? minutesLeft + ' minutes left'
                : ''
            }`}
          </p>
        )}
      </div>
      {book?.imageUrl ? (
        <img
          src={book?.imageUrl}
          alt='book'
          width='137'
          height='208'
          className='rounded-lg w-[137px] h-[208px] mb-[10px] mx-auto md:w-[169px] md:h-[256px] md:mb-[25px] xl:w-[224px] xl:h-[340px]'
        />
      ) : (
        <DefaultImg classNames='w-[137px] h-[208px] mb-[10px] mx-auto md:w-[169px] md:h-[256px] md:mb-[25px] xl:w-[224px] xl:h-[340px]' />
      )}

      <h3
        className='font-bold text-sm leading-[129%] tracking-[-0.02em] mb-[5px] text-center md:text-xl md:leading-[100%] md:mb-1'
        title={book?.title}
      >
        {book?.title}
      </h3>
      <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-[#686868] text-center mb-5 md:text-sm md:leading-[129%] md:mb-4 xl:mb-[25px]'>
        {book?.author}
      </p>
      <svg width={isMob ? 40 : 50} height={isMob ? 40 : 50} className='mx-auto'>
        <use href={`/icons.svg#${status === 'stop' ? 'stop' : 'play'}`}></use>
      </svg>
    </section>
  );
}
