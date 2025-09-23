import ProgressCircle from './ProgressCircle';
import { useSelector } from 'react-redux';
import { selectBook } from '../redux/selectors';
import { useMediaQuery } from 'react-responsive';

export interface StatisticsProps {}

export default function Statistics({}: StatisticsProps) {
  const isDesk = useMediaQuery({ minWidth: 1280 });
  const book = useSelector(selectBook);
  const progress = () => {
    if (!book) return;
    let result;
    if (book.progress[book.progress.length - 1].finishPage) {
      result =
        (book.progress[book.progress.length - 1].finishPage * 100) /
        book.totalPages;
    } else {
      result =
        (book.progress[book.progress.length - 2].finishPage * 100) /
        book.totalPages;
    }

    return result.toFixed(2);
  };

  const finishPage = book && book.progress[book.progress.length - 1].finishPage;

  return (
    <>
      {isDesk && (
        <p className='font-medium text-sm leading-[129%] tracking-[-0.02em] text-[#686868] mb-5'>
          Each page, each chapter is a new round of knowledge, a new step
          towards understanding. By rewriting statistics, we create our own
          reading history.
        </p>
      )}
      <div className='bg-[#262626] rounded-xl p-5 md:p-7 md:min-w-[321px] xl:p-5 xl:min-w-0'>
        <div className='xl:w-[189px] xl:h-[189px] flex items-center justify-center mx-auto mb-[21px] md:mb-4 xl:mb-[10px]'>
          <ProgressCircle percentage={Number(progress())} colour='green' />
        </div>
        <div className='ml-[109px]'>
          <p className="before:content-[''] before:block before:rounded before:w-[14px] before:h-[14px] before:bg-[#30b94d] font-medium text-sm leading-[129%] tracking-[-0.02em] relative before:absolute before:left-[-29px] before:top-1/2 before:translate-y-[-50%] mb-1 md:text-xl md:leading-[100%] md:mb-2">
            {progress()}%
          </p>
          <p className='font-medium text-[10px] leading-[120%] tracking-[-0.02em] text-[#686868] md:text-xs md:leading-[117%]'>
            {finishPage} pages read
          </p>
        </div>
      </div>
    </>
  );
}
