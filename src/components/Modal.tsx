import React, { useEffect } from 'react';

export interface ModalProps {
  onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-[rgba(20,20,20,0.6)] z-[1010]'
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        (e.target as HTMLElement) === e.currentTarget && onClose()
      }
    >
      <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 border w-[335px] p-10 rounded-xl border-solid border-[rgba(104,104,104,0.2)] bg-[#1f1f1f] z-[1100] md:w-[500px] md:py-[50px]'>
        <button
          type='button'
          onClick={onClose}
          className='absolute top-4 right-4 w-[22px] h-[22px] flex justify-center items-center'
        >
          <svg width='14' height='14' className='stroke-[#f9f9f9] stroke-[2]'>
            <use href='/icons.svg#close'></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
