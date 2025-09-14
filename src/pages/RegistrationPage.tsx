
import { Link } from 'react-router-dom';

export interface RegistrationPageProps {}

export default function RegistrationPage({}: RegistrationPageProps) {
  return (
    <div>
      <p>RegistrationPage</p>
      <Link to='/login'>Already have an account?</Link>
    </div>
  );
};
