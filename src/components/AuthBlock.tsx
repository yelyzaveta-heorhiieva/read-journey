
import Logo from './Logo';


export interface AuthBlockProps {
  children: React.ReactNode;
}

export default function AuthBlock({ children }: AuthBlockProps) {


  return (
    <div
      className='px-5 pt-5 pb-10 bg-[#1f1f1f] rounded-[30px] 
    md:pt-10 md:pb-[214px] md:pl-16 md:pr-[168px] xl:pb-10 xl:pr-16'
    >
      <Logo classNames='mb-10 md:mb-[157px] xl:mb-[107px]' />
      <h1 className='font-bold text-[32px] leading-[100%] tracking-[0.02em] md:text-[64px] md:leading-[94%] md:mb-10 mb-5'>
        Expand your mind, reading{' '}
        <span className='text-[rgba(227,227,227,0.5)]'>a book</span>
      </h1>
      {children}
    </div>
  );
}
