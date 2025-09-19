import type { FiltersValues } from '../types';
import { Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { addBook } from '../redux/books/operations';
import { useState } from 'react';
import AddBookNotification from './AddBookNotification';

export interface AddBookProps {}

export default function AddBook({}: AddBookProps) {
    const dispatch = useDispatch<AppDispatch>();
     const [openNofification, setOpenNotification] = useState(false);

  const initialValues: FiltersValues = {
    title: '',
    author: '',
    totalPages: '',
  };

  const handleSubmit = (
    values: FiltersValues,
    actions: FormikHelpers<FiltersValues>,
  ) => {
    dispatch(
      addBook({
        author: values?.author?.trim(),
        title: values?.title?.trim(),
        totalPages: Number(values?.totalPages),
      }),
    )
      .unwrap()
      .then(() => setOpenNotification(true));
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too short!')
      .max(120, 'Too long!')
      .required('Required'),
    author: Yup.string()
      .min(2, 'Too short!')
      .max(80, 'Too long!')
      .required('Required'),
    totalPages: Yup.number()
      .typeError('Enter a number')
      .min(1, 'Must be at least 1')
      .max(5000, 'Must be at most 5000')
      .required('Required'),
  });

  return (
    <div className='w-full'>
      <p className='ml-[14px] mb-2 font-medium text-[10px] leading-[120%] tracking-[-0.02em] md:text-sm md:leading-[129%]'>
        Filters:
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, errors, touched }) => (
          <Form className='flex flex-col gap-2'>
            <Input
              type='text'
              placeholder='I See You Are Interested In The Dark'
              name='title'
              label='Book title:'
              isValidate={true}
              error={errors.title}
              touched={touched.title}
            />
            <Input
              type='text'
              placeholder='Hilarion Pavlyuk'
              name='author'
              label='The author:'
              isValidate={true}
              error={errors.author}
              touched={touched.author}
            />
            <Input
              type='text'
              placeholder='664'
              name='totalPages'
              label='Number of pages:'
              isValidate={true}
              error={errors.totalPages}
              touched={touched.totalPages}
            />
            <button
              type='submit'
              disabled={!isValid}
              className='mt-3 border w-[105px] h-[38px] flex items-center justify-center rounded-[30px] border-solid border-[rgba(249,249,249,0.2)] font-bold text-sm leading-[129%] tracking-[0.02em] md:w-[122px] md:h-[42px] md:text-base md:leading-[112%] hover:bg-[#f9f9f9] hover:text-[#1f1f1f] transition-all duration-300 disabled:bg-[rgba(249,249,249,0.51)]'
            >
              Add book
            </button>
          </Form>
        )}
          </Formik>
          {openNofification && <AddBookNotification onClose={()=>setOpenNotification(false)} />}
    </div>
  );
}
