import phoneDesk from '../assets/images/1x/phone-desk.png';
import phoneDesk_2x from '../assets/images/2x/phone-desk@2x.png';
import phoneMob from '../assets/images/1x/phone-mob.png';
import phoneMob_2x from '../assets/images/2x/phone-mob@2x.png';
import { useMediaQuery } from 'react-responsive';

export interface HeroProps {}

export default function Hero({ }: HeroProps) {
    const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  return isMediumScreen ? null : (
    <div className='flex px-10 xl:px-0 xl:min-w-[600px] justify-center xl:pt-20 pt-5 rounded-[30px] bg-[#1f1f1f]'>
      <picture>
        <source
          media='(min-width: 1280px)'
          srcSet={`${phoneDesk} 1x, ${phoneDesk_2x} 2x`}
        />
        <source
          media='(max-width: 767px)'
          srcSet={`${phoneMob} 1x, ${phoneMob_2x} 2x`}
        />
        <img src={phoneMob} alt='App open in phone' />
      </picture>
    </div>
  );
}
