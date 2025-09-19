import React from 'react';
import Modal from './Modal';
import likeMob from '../assets/images/1x/like-mob.png'
import likeMob_2x from '../assets/images/2x/like-mob@2x.png'
import likeDesk from '../assets/images/1x/like-desk.png'
import likeDesk_2x from '../assets/images/2x/like-desk@2x.png'

export interface AddBookNotificationProps {
  onClose: () => void;
}

export default function AddBookNotification({onClose}: AddBookNotificationProps) {
  return (
    <Modal onClose={onClose} classNames='md:w-[342px]'>
      <div className='p-5 flex items-center flex-col md:py-0 md:px-[10px]'>
        <picture className='mb-5 md:mb-8'>
          <source
            media='(min-width: 768px)'
            srcSet={`${likeDesk} 1x, ${likeDesk_2x} 2x`}
          />
          <source
            media='(max-width: 767px)'
            srcSet={`${likeMob} 1x, ${likeMob_2x} 2x`}
          />
          <img src={likeMob} alt='books' />
        </picture>
        <h2 className='font-bold text-lg leading-[100%] tracking-[-0.02em] text-center mb-[10px] md:text-xl md:leading-[100%] md:mb-[14px]'>
          Good job
        </h2>
        <p className='font-medium text-sm leading-[129%] tracking-[-0.02em] text-center text-[#686868] md:max-w-[242px]'>
          Your book is now in{' '}
          <span className='text-[#f9f9f9]'>the library!</span> The joy knows no
          bounds and now you can start your training
        </p>
      </div>
    </Modal>
  );
};
