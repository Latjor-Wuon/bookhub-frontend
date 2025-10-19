export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  isbn: string;
  description: string;
  coverImage?: string;
  rating: number;
  price: number;
  availability: 'available' | 'unavailable';
  reviews?: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface BookFilters {
  search: string;
  genre: string;
  sortBy: 'title' | 'author' | 'publicationDate' | 'rating' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  minRating: number;
  maxPrice: number;
}

export interface BooksState {
  books: Book[];
  currentBook: Book | null;
  filters: BookFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBooks: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  favorites: string[];
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalBooks: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
