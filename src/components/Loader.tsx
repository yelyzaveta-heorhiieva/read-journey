import React, { type CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader, DotLoader, PuffLoader } from 'react-spinners';
import { selectIsLoading } from '../redux/selectors';

export interface LoaderProps {}

const override: CSSProperties = {
  display: 'block',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: '0 auto',
};

export default function Loader({}: LoaderProps) {
  const isLoading = useSelector(selectIsLoading);
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-[rgba(11,11,11,0.8)] z-[1010]'>
      <PuffLoader
        color='blueviolet'
        loading={isLoading}
        cssOverride={override}
        size={90}
      />
    </div>
  );
}
