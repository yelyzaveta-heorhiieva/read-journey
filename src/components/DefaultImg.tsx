import defaultImg from '../assets/images/1x/book-mob.png';
import defaultImgDesk from '../assets/images/1x/book-desk.png';
import defaultImg_2x from '../assets/images/2x/book-mob@2x.png';
import defaultImgDesk_2x from '../assets/images/2x/book-desk@2x.png';

export interface DefaultImgProps {
  classNames?: string;
  onClick?: () => void;
}

export default function DefaultImg({ classNames, onClick }: DefaultImgProps) {
  return (
    <picture>
      <source
        media='(min-width: 768px)'
        srcSet={`${defaultImgDesk} 1x, ${defaultImgDesk_2x} 2x`}
      />
      <source
        media='(max-width: 767px)'
        srcSet={`${defaultImg} 1x, ${defaultImg_2x} 2x`}
      />
      <img
        src={defaultImg}
        alt='book'
        className={classNames}
        onClick={onClick}
      />
    </picture>
  );
}
