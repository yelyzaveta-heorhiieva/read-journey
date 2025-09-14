import Hero from '../components/Hero';
import Container from '../components/Container';
import AuthBlock from '../components/AuthBlock';
import AuthForm from '../components/AuthForm';

export interface LoginPageProps {}

export default function LoginPage({}: LoginPageProps) {
  return (
      <Container classNames='flex flex-col gap-[10px] py-5 md:py-8 xl:flex-row'>
        <AuthBlock>
          <AuthForm
            isRegister={false}
            link={{ to: '/register', text: 'Don’t have an account?' }}
          />
        </AuthBlock>
        <Hero />
      </Container>
  );
}
