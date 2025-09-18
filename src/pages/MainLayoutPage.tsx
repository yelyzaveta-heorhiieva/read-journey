import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import { useEffect } from 'react';

export interface MainLayoutPageProps {}

export default function MainLayoutPage({}: MainLayoutPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/recommended', { replace: true });
    }
  }, [navigate]);

  return (
    <Container classNames='pt-5 md:pt-8'>
      <Header />
      <Outlet />
    </Container>
  );
}
