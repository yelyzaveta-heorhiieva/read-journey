import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  classNames?: string;
}

export default function Container({ children, classNames }: ContainerProps) {
  return (
    <div
      className={`min-w-[320px] xs:w-[375px] md:max-w-[768px] md:min-w-[768px] xl:max-w-[1280px] xl:min-w-[1280px] px-5 md:px-8 ${classNames}`}
    >
      {children}
    </div>
  );
}
