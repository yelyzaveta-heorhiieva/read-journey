import { Form, Formik, type FormikHelpers } from 'formik';
import type { FiltersValues } from '../types';
import Input from './Input';

export interface FiltersProps {
  handleSubmit:  (
     values: FiltersValues,
     actions: FormikHelpers<FiltersValues>,
   ) => void
}

export default function Filters({handleSubmit}: FiltersProps) {
  const initialValues: FiltersValues = {
    title: '',
    author: '',
  };

 
  return (
    <div className='mb-5'>
      <p className='ml-[14px] mb-2 font-medium text-[10px] leading-[120%] tracking-[-0.02em]'>
        Filters:
      </p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className='flex flex-col gap-2'>
          <Input
            type='text'
            placeholder='Enter text'
            name='title'
            label='Book title:'
          />
          <Input
            type='text'
            placeholder='Enter text'
            name='author'
            label='The author:'
          />
          <button
            type='submit'
            className='mt-3 border w-[98px] h-[38px] flex items-center justify-center rounded-[30px] border-solid border-[rgba(249,249,249,0.2)]'
          >
            To apply
          </button>
        </Form>
      </Formik>
    </div>
  );
}
