import Hero from '../components/Hero';
import Container from '../components/Container';
import AuthBlock from '../components/AuthBlock';
import AuthForm from '../components/AuthForm';
import type { AuthFormValues } from '../types';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { logIn } from '../redux/auth/operations';

export interface LoginPageProps {}

export default function LoginPage({ }: LoginPageProps) {
  const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (values: AuthFormValues) => {
      dispatch(
        logIn({
          email: values.email.trim(),
          password: values.password.trim(),
        }),
      );
  };
  
  return (
      <Container classNames='flex flex-col gap-[10px] py-5 md:py-8 xl:flex-row'>
        <AuthBlock>
        <AuthForm
          handleSubmit={handleSubmit}
            isRegister={false}
            link={{ to: '/register', text: 'Don’t have an account?' }}
          />
        </AuthBlock>
        <Hero />
      </Container>
  );
}
