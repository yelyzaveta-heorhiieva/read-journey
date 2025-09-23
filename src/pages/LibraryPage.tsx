import { useSelector } from 'react-redux';
import { selectOwnBooks } from '../redux/selectors';
import Dashboard from '../components/Dashboard';
import MyLibraryBooks from '../components/MyLibraryBooks';
import AddBook from '../components/AddBook';
import RecommendedMini from '../components/RecommendedMini';
import Container from '../components/Container';

export interface LibraryPageProps {}

export default function LibraryPage({}: LibraryPageProps) {
  const ownBooks = useSelector(selectOwnBooks);

  return (
    <Container classNames='pages-box'>
        <Dashboard>
          <AddBook />
          <RecommendedMini />
        </Dashboard>
        <MyLibraryBooks />
    </Container>
  );
}
