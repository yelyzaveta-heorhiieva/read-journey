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
  title: string;
  author: string;
  totalPages?: string | number;
}

export interface RecommendedBook {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommended?: boolean;
}

export type OptionType = {
  value: string;
  label: string;
};

export interface FetchRecommended {
  title?: string;
  author?: string;
  page?: number;
  limit?: number;
}

export interface Progress {
  startPage: number;
  startReading: Date;
  finishPage: number;
  finishReading: Date;
  speed: number;
  status: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: string;
  owner: string;
  progress: Progress[];
  timeLeftToRead: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}
