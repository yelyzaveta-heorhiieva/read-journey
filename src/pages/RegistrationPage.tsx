import { Link } from 'react-router-dom';
import Container from '../components/Container';
import AuthBlock from '../components/AuthBlock';
import AuthForm from '../components/AuthForm';
import Hero from '../components/Hero';

export interface RegistrationPageProps {}

export default function RegistrationPage({}: RegistrationPageProps) {
  return (
    <Container classNames='flex flex-col gap-[10px] py-5 md:py-8 xl:flex-row xl:justify-between xl:gap-4'>
      <AuthBlock>
        <AuthForm
          isRegister={true}
          link={{ to: '/login', text: 'Already have an account?' }}
        />
      </AuthBlock>
      <Hero />
    </Container>
  );
}
