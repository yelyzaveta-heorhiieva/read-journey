export interface Routes {
  component: React.ReactElement;
  redirectTo: string;
  isLoggedIn: boolean;
}

export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}