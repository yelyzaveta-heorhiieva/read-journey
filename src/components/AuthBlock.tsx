import { useMediaQuery } from 'react-responsive';


export interface AuthBlockProps {
  children: React.ReactNode;
}

export default function AuthBlock({ children }: AuthBlockProps) {
  const isMob = useMediaQuery({
    query: '(max-width: 767px)',
  });

    

  return (
    <div
      className='px-5 pt-5 pb-10 bg-[#1f1f1f] rounded-[30px] 
    md:pt-10 md:pb-[214px] md:pl-16 md:pr-[168px] xl:pb-10 xl:pr-16'
    >
      <div className='flex gap-1 items-center mb-10 md:mb-[157px] xl:mb-[107px] '>
        <svg width='42' height='17' className='fill-[#F9F9F9] '>
          <use href='/icons.svg#logo'></use>
        </svg>{' '}
        {!isMob && (
          <p className='font-bold text-lg leading-[100%] tracking-[0.02em] uppercase'>
            read journey
          </p>
        )}
      </div>
      <h1 className='font-bold text-[32px] leading-[100%] tracking-[0.02em] md:text-[64px] md:leading-[94%] md:mb-10 mb-5'>
        Expand your mind, reading{' '}
        <span className='text-[rgba(227,227,227,0.5)]'>a book</span>
      </h1>
      {children}
    </div>
  );
}
