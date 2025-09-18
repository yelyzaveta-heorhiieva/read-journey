export interface Routes {
  component: React.ReactElement;
  redirectTo: string;
}

export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}

export interface FiltersValues {
  title: string,
  author: string,
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recomended: boolean;
}

export interface FetchRecomended {
  title?: string;
  author?: string;
  page?: number;
  limit?: number;
}