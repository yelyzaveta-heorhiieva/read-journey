
import Container from '../components/Container';
import AuthBlock from '../components/AuthBlock';
import AuthForm from '../components/AuthForm';
import Hero from '../components/Hero';
import type { AuthFormValues } from '../types';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/operations';
import type { AppDispatch } from '../redux/store';

export interface RegistrationPageProps {}

export default function RegistrationPage({}: RegistrationPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (values: AuthFormValues) => {
    dispatch(register({
      name: values?.name?.trim(),
      email: values.email.trim(),
      password: values.password.trim()
    }));
  };

  return (
    <Container classNames='flex flex-col gap-[10px] py-5 md:py-8 xl:flex-row xl:justify-between xl:gap-4'>
      <AuthBlock>
        <AuthForm
          handleSubmit={handleSubmit}
          isRegister={true}
          link={{ to: '/login', text: 'Already have an account?' }}
        />
      </AuthBlock>
      <Hero />
    </Container>
  );
}
