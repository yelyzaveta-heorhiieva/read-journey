import { Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { startReading, stopReading } from '../redux/books/operations';
import { selectBook, selectCurrentPage } from '../redux/selectors';
import toast from 'react-hot-toast';

export interface AddReadingProps {
  id: string | undefined;
  status: 'stop' | 'start';
}
interface FormValues {
  page: number;
}

export default function AddReading({ id, status }: AddReadingProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(selectCurrentPage);
  const book = useSelector(selectBook);

  const initialValues: FormValues = {
    page: currentPage,
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    if (id && book && currentPage < book?.totalPages) {
      status === 'stop'
        ? dispatch(stopReading({ id, page: values.page }))
        : dispatch(startReading({ id, page: values.page }));
    } else {
      toast.error('You have already read this book');
    }
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    page: Yup.number()
      .typeError('Enter a number')
      .test('min-page', function (value) {
        const min = currentPage + 1 || 1;
        if (book && value! >= book.totalPages) {
          return this.createError({
            message: `Max page is ${book.totalPages}`,
          });
        } else if (book && min >= book.totalPages) {
          return this.createError({
            message: `You have already read this book`,
          });
        } else if (value! < min) {
          return this.createError({ message: `Must be at least ${min}` });
        }
        return true;
      })
      .test('max-page', function (value) {
        const max = currentPage + 1 || 1;
        if (book && (value! >= book.totalPages || max >= book.totalPages)) {
          return this.createError({
            message: `Max page is ${book?.totalPages}`,
          });
        }
        if (status === 'start' && value! > max) {
          return this.createError({ message: `Must be at most ${max}` });
        }
        return true;
      })
      .max(book?.totalPages || 5000, `Must be at most ${book?.totalPages}`)
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
        {({ isValid, errors, touched, dirty }) => (
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
              disabled={!isValid || !dirty}
              className='mt-3 border w-[91px] h-[38px] flex items-center justify-center rounded-[30px] border-solid border-[rgba(249,249,249,0.2)] font-bold text-sm leading-[129%] tracking-[0.02em] md:mt-[30px] md:w-[131px] md:h-[42px] md:text-base md:leading-[112%] hover:bg-[#f9f9f9] hover:text-[#1f1f1f] transition-all duration-300 disabled:bg-[rgba(249,249,249,0.51)] xl:mt-3'
            >
              {status === 'stop' ? 'To stop' : 'To start'}
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
