import { Link } from "react-router-dom";


export interface LoginPageProps {}

export default function LoginPage({}: LoginPageProps) {
  return (
    <div>
      <p>LoginPage</p>
      <Link to='/register'>Don’t have an account? </Link>
    </div>
  );
};
