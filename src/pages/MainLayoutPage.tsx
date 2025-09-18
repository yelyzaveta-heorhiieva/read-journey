
import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";

export interface MainLayoutPageProps {}

export default function MainLayoutPage({ }: MainLayoutPageProps) {
  
  return (
    <Container classNames='pt-5 md:pt-8'>
      <Header />
      <Outlet />
    </Container>
  );
};
