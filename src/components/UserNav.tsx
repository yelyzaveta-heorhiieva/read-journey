import { NavLink } from 'react-router-dom';

export interface UserNavProps {}

const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
  return `font-medium text-sm leading-[129%] tracking-[-0.02em] inline-block md:text-base md:leading-[112%] ${
    isActive
      ? "text-[#f9f9f9] relative after:content-[''] after:block after:w-[110%] after:h-[3px] after:bg-[#4f92f7] after:rounded-[8px] after:absolute after:bottom-[-6px] md:after:bottom-[-10px] after:left-1/2 after:translate-x-[-50%]"
      : 'text-[#686868]'
  }`;
};

export default function UserNav({}: UserNavProps) {
  return (
    <ul className='translate-y-[-50%] absolute top-1/2 flex flex-col gap-4 md:left-1/2 md:translate-x-[-50%] md:flex-row md:items-center md:gap-8'>
      <li className=''>
        <NavLink to='recomended' className={buildLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='library' className={buildLinkClass}>
          My library
        </NavLink>
      </li>
    </ul>
  );
}
