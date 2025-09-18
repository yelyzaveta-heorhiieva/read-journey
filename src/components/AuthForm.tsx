import { Form, Formik } from 'formik';
import { useState } from 'react';
import type { AuthFormValues } from '../types';
import Input from './Input';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import * as Yup from 'yup';

export interface AuthFormProps {
  isRegister: boolean;
    link: { to: string; text: string };
    handleSubmit: (values: AuthFormValues) => void
}

export default function AuthForm({ isRegister, link, handleSubmit }: AuthFormProps) {
  const [show, setShow] = useState(false);
  const isBigScreen = useMediaQuery({
    query: '(min-width: 1280px)',
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: isRegister
      ? Yup.string()
          .min(2, 'Too short!')
          .max(50, 'Too long!')
          .required('Required')
      : Yup.string().notRequired(),
    email: Yup.string()
      .email('Invalid email')
      .required('Required!')
      .matches(
        /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        'Must be in format user123@gmail.com',
      ),
    password: Yup.string()
      .min(7, 'Password must be at least 7 characters long')
      .required('Required!'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, errors, touched }) => (
        <Form className='flex flex-col gap-2 md:gap-[14px]'>
          {isRegister && (
            <Input
              type='text'
              placeholder='Ilona Ratushniak'
              label='Name: '
              name='name'
              error={errors.name}
              touched={touched.name}
              isValidate={true}
            />
          )}
          <Input
            type='email'
            placeholder='Your@email.com'
            label='Mail: '
            name='email'
            error={errors.email}
            touched={touched.email}
            isValidate={true}
          />
          {
            <Input
              type={show ? 'text' : 'password'}
              placeholder='Yourpasswordhere'
              label='Password: '
              name='password'
              error={errors.password}
              touched={touched.password}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              isValidate={true}
            >
              {((!errors.password && !touched.password) || show) && (
                <button
                  type='button'
                  onClick={
                    !isBigScreen ? () => setShow((prev) => !prev) : undefined
                  }
                  className={`absolute top-1/2 right-4 translate-y-[-50%] 
      group-hover:right-[15px] md:group-hover:right-[17px] md:right-[18px] 
      ${!isBigScreen ? 'cursor-pointer' : 'cursor-auto'}`}
                >
                  <svg
                    width='18'
                    height='18'
                    className='stroke-[#F9F9F9] fill-none'
                  >
                    <use href={`/icons.svg#${show ? 'eye' : 'eye-off'}`} />
                  </svg>
                </button>
              )}
            </Input>
          }
          <div
            className={`flex gap-[14px] md:gap-5 items-center ${
              isRegister ? 'mt-3 md:mt-[68px]' : 'mt-16 md:mt-[132px]'
            }`}
          >
            <button
              type='submit'
              disabled={!isValid}
              className={` h-[42px] md:h-[52px] bg-[#f9f9f9] rounded-[30px] flex items-center justify-center font-bold text-sm md:text-xl md:leading-[100%] leading-[129%] tracking-[0.02em] text-[#1f1f1f] hover:border hover:border-solid hover:border-[rgba(249,249,249,0.2)] hover:bg-transparent hover:text-[#f9f9f9] transition-all duration-300
            ${
              isRegister ? 'w-[140px] md:w-[225px]' : 'w-[131px] md:w-[166px]'
            }`}
            >
              {isRegister ? 'Registration' : 'Log in'}
            </button>
            <Link
              to={link.to}
              className='font-medium text-xs md:text-sm md:leading-[129%] leading-[117%] tracking-[-0.02em] underline text-[#686868] text-decoration-skip-none hover:text-[#f9f9f9] transition-all duration-300'
            >
              {link.text}
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
