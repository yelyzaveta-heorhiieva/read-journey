import { Form, Formik } from 'formik';
import  { useState } from 'react';
import * as Yup from 'yup';
import Input from './Input';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { startReading, stopReading } from '../redux/books/operations';

export interface AddReadingProps {
  id: string | undefined;
}
interface FormValues {
  page: number;
}

export default function AddReading({ id }: AddReadingProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [start, setStart] = useState(false);

  const initialValues: FormValues = {
    page: 0,
  };

  const handleSubmit = (values: FormValues) => {
    if (id) {
      start
        ? dispatch(stopReading({ id, page: values.page }))
        : dispatch(startReading({ id, page: values.page }));
      setStart((prev) => !prev);
    }
    };
    
     const validationSchema = Yup.object().shape({
       page: Yup.number()
         .typeError('Enter a number')
         .min(1, 'Must be at least 1')
         .max(5000, 'Must be at most 5000')
         .integer('Must be an integer')
         .required('Required'),
     });
    
  return (
    <div className='w-full md:min-w-[295px] mb-5'>
      <p className='ml-[14px] mb-2 font-medium text-[10px] leading-[120%] tracking-[-0.02em] md:text-sm md:leading-[129%]'>
        Start page:
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, errors, touched }) => (
          <Form className='flex flex-col gap-2'>
            <Input
              type='number'
              placeholder='0'
              name='page'
              label='Page number:'
              isValidate={true}
              error={errors.page}
              touched={touched.page}
            />
            <button
              type='submit'
              disabled={!isValid}
              className='mt-3 border w-[91px] h-[38px] flex items-center justify-center rounded-[30px] border-solid border-[rgba(249,249,249,0.2)] font-bold text-sm leading-[129%] tracking-[0.02em] md:mt-[30px] md:w-[131px] md:h-[42px] md:text-base md:leading-[112%] hover:bg-[#f9f9f9] hover:text-[#1f1f1f] transition-all duration-300 disabled:bg-[rgba(249,249,249,0.51)] xl:mt-3'
            >
              {start ? 'To stop' : 'To start'}
            </button>
          </Form>
        )}
      </Formik>
      {/* {openNofification && (
        <AddBookNotification onClose={() => setOpenNotification(false)} />
      )} */}
    </div>
  );
}
