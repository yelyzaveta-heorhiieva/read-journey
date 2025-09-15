export interface Routes {
  component: React.ReactElement;
  redirectTo: string;
}

export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}