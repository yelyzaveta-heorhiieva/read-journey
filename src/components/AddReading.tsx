import { Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import { useSelector } from 'react-redux';
import { selectBook, selectCurrentPage } from '../redux/selectors';
import type { FormValues } from '../types';

export interface AddReadingProps {
  handleSubmit: (
     values: FormValues,
     actions: FormikHelpers<FormValues>,
   ) => void
  status: 'stop' | 'start';
}


export default function AddReading({ status, handleSubmit }: AddReadingProps) {
  const currentPage = useSelector(selectCurrentPage);
  const book = useSelector(selectBook);

  const initialValues: FormValues = {
    page: currentPage,
  };

  const validationSchema = Yup.object().shape({
    page: Yup.number()
      .typeError('Enter a number')
      .test('page-range', function (value) {
        if (!book) return true;
        const min = currentPage + 1;
        const max = book.totalPages;
        if (
          (status === 'start' && min > max) ||
          (status === 'stop' && min - 1 > max)
        ) {
          return this.createError({
            message: `You have already read this book`,
          });
        }

        if (status === 'start' && value! < min) {
          return this.createError({ message: `Must be at least ${min}` });
        }
        if (status === 'stop' && value! < min - 1) {
          return this.createError({ message: `Must be at least ${min - 1}` });
        }

        if (value! > max) {
          return this.createError({ message: `Max page is ${max}` });
        }
        if (status === 'start' && value! > min) {
          return this.createError({ message: `Must be at most ${min}` });
        }

        return true;
      })
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
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {({ isValid, errors, touched }) => (
          <Form className='flex flex-col gap-2'>
            <Input
              type='number'
              placeholder={String(initialValues.page)}
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
              {status === 'stop' ? 'To stop' : 'To start'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
