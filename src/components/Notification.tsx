
import Modal from './Modal';
import likeMob from '../assets/images/1x/like-mob.png'
import likeMob_2x from '../assets/images/2x/like-mob@2x.png'
import likeDesk from '../assets/images/1x/like-desk.png'
import likeDesk_2x from '../assets/images/2x/like-desk@2x.png'
import booksMob from '../assets/images/1x/books-mob.png';
import booksMob_2x from '../assets/images/2x/books-mob@2x.png';
import booksDesk from '../assets/images/1x/books-desk.png';
import booksDesk_2x from '../assets/images/2x/books-desk@2x.png';




export interface NotificationProps {
  onClose: () => void;
  library?: boolean;
}

export default function Notification({ onClose, library }: NotificationProps) {
  
  return (
    <Modal onClose={onClose} classNames='md:w-[342px]'>
      <div className='py-5 px-[6px]  flex items-center flex-col md:py-0 md:px-[10px]'>
        <picture className='mb-5 md:mb-8'>
          <source
            media='(min-width: 768px)'
            srcSet={`${library ? likeDesk : booksDesk} 1x, ${
              library ? likeDesk_2x : booksDesk_2x
            } 2x`}
          />
          <source
            media='(max-width: 767px)'
            srcSet={`${library ? likeMob : booksMob} 1x, ${
              library ? likeMob_2x : booksMob_2x
            } 2x`}
          />
          <img src={library ? likeMob : booksMob} alt='books' />
        </picture>
        <h2 className='font-bold text-lg leading-[100%] tracking-[-0.02em] text-center mb-[10px] md:text-xl md:leading-[100%] md:mb-[14px]'>
          {library ? ' Good job' : 'The book is read'}
        </h2>
        <p className='font-medium text-sm leading-[129%] tracking-[-0.02em] text-center text-[#686868] md:max-w-[242px]'>
          {library ? 'Your book is now in' : 'It was an'}{' '}
          <span className='text-[#f9f9f9]'>
            {library ? 'the library!' : 'exciting journey'}
          </span>
          {library ? ' The joy knows no bounds and now you can start your training' : ', where each page revealed new horizons, and the characters became inseparable friends.'}
        </p>
      </div>
    </Modal>
  );
};
