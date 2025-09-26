
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { logOut } from '../redux/auth/operations';

export interface LogoutBtnProps {}

export default function LogoutBtn({ }: LogoutBtnProps) {
    const dispatch = useDispatch<AppDispatch>();
    
  return (
    <button
      type='button'
      onClick={() => dispatch(logOut())}
      className='border w-[91px] h-[38px] flex items-center justify-center  rounded-[30px] border-solid border-[rgba(249,249,249,0.2)] font-bold text-sm leading-[129%] tracking-[0.02em] md:text-base md:leading-[112%] md:w-[114px] md:h-[42px]'
    >
      Log out
    </button>
  );
};
