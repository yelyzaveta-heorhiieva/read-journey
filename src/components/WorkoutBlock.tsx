
import { Link } from 'react-router-dom';

export interface WorkoutBlockProps {}
const arr = [
  {
    title: 'Create a personal library: ',
    span: 'add the books you intend to read to it.',
  },
  {
    title: 'Create your first workout: ',
    span: 'define a goal, choose a period, start training.',
  },
];

export default function WorkoutBlock({}: WorkoutBlockProps) {
  return (
    <div className='bg-[#262626] rounded-xl p-5 xl:mb-5 w-full md:max-w-[313px]'>
      <h2 className='font-bold text-lg leading-[100%] tracking-[-0.02em] mb-5 md:text-xl md:mb-10 md:leading-[100%]'>
        Start your workout
      </h2>
      <ul className='flex flex-col gap-5 mb-5'>
        {arr.map(({ title, span }, i) => {
          return (
            <li className='flex gap-3' key={title + i}>
              <span className='min-w-10 h-10 flex items-center justify-center bg-[#f9f9f9] rounded-full font-bold text-lg leading-[100%] tracking-[-0.02em] text-center text-[#1f1f1f] md:min-w-11 md:h-11 md:text-xl'>
                {i + 1}
              </span>
              <p className='font-medium text-sm leading-[129%] tracking-[-0.02em] md:max-w-[197px]'>
                {title}
                <span className='text-[#686868]'>{span}</span>
              </p>
            </li>
          );
        })}
      </ul>
      <Link
        to='/library'
        className='group hover:text-[#f9f9f9] transition-all flex justify-between items-end font-medium text-sm leading-[129%] tracking-[-0.02em] underline text-[#686868] text-decoration-skip-none'
      >
        My library
        <svg
          width='24'
          height='24'
          className='stroke-[#F9F9F9] stroke-2 group-hover:scale-110 transition-all'
        >
          <use href='/icons.svg#arrow-right'></use>
        </svg>
      </Link>
    </div>
  );
}
