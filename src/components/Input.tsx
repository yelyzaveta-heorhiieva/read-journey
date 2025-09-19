import { Field } from 'formik';
import React from 'react';

export interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  children?: React.ReactNode;
  error?: string | undefined;
  touched?: boolean | undefined;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isValidate?: boolean;
}

export default function Input({
  type,
  placeholder,
  name,
  label,
  children,
  error,
  touched,
  onMouseEnter, 
  onMouseLeave, isValidate
}: InputProps) {
  return (
    <div>
      <label
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`group relative flex items-center gap-[10px] w-full h-[44px] md:h-[50px]  rounded-xl bg-[#262626] hover:border hover:border-solid hover:border-[rgba(249,249,249,0.1)] hover:p-[13px] hover:md:py-[15px]  ${
          touched && error
            ? 'border border-[#e90516] p-[13px] md:py-[15px]'
            : touched
            ? 'border border-[#30b94d] p-[13px] md:py-[15px]'
            : 'border-none p-[14px] md:py-4'
        }`}
      >
        <span className='text-nowrap font-medium text-xs md:text-sm md:leading-[129%] leading-[133%] tracking-[-0.02em] text-[#686868]'>
          {label}
        </span>
        <Field
          type={type}
          placeholder={placeholder}
          name={name}
          className='outline-none w-full
          border-none placeholder-[#f9f9f9] bg-[transparent] md:text-sm md:leading-[129%]
          font-medium text-xs leading-[133%] tracking-[-0.02em] text-[#f9f9f9]'
        />
        {children}
        {isValidate && (
          <svg
            width='20'
            height='20'
            className={`absolute top-[50%] translate-y-[-50%] right-4 md:right-[18px] group-hover:hidden ${
              !touched && !error && 'hidden'
            }`}
          >
            <use
              href={`/icons.svg#${
                touched && error ? 'error' : touched ? 'check' : ''
              }`}
            ></use>
          </svg>
        )}
      </label>
      {isValidate && (
        <p
          className={`mt-1 ml-[14px] font-medium text-xs leading-[117%] tracking-[-0.02em]  
      ${
        touched && error
          ? 'text-[#e90516]'
          : touched
          ? 'text-[#30b94d]'
          : 'hidden'
      }`}
        >
          {touched && error ? (
            error
          ) : touched ? (
            <span>
              <span className='capitalize'>{name}</span> is secure
            </span>
          ) : null}
        </p>
      )}
    </div>
  );
}
