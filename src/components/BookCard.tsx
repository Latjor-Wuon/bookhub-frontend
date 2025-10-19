import React, { useState } from 'react';
import { Star, Edit2, Trash2, Clock, BookOpen, Calendar, Tag } from 'lucide-react';
import type { Book } from '../types';
import { useAppSelector, useAppDispatch } from '../store';
import { deleteBook } from '../store/slices/booksSlice';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onEdit }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setIsDeleting(true);
      dispatch(deleteBook(book._id));
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3]">
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {user && (
          <div 
            className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={() => onEdit(book)}
              className="flex-1 flex items-center justify-center gap-2 bg-white/95 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors text-sm font-medium backdrop-blur-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500/90 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 text-sm font-medium backdrop-blur-sm"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? '...' : 'Delete'}
            </button>
          </div>
        )}

        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 rounded-full shadow-lg backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-semibold text-sm text-gray-800">
              {book.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2 mb-2 font-display">
          {book.title}
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{book.author}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{formatDate(book.publicationDate)}</span>
          </div>
          
          <div className="flex items-start gap-2">
            <Tag className="w-4 h-4 flex-shrink-0 text-gray-600 mt-1" />
            <div className="flex flex-wrap gap-1.5">
              {book.genre.split(',').map((g: string) => (
                <span
                  key={g}
                  className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-600 rounded-full border border-primary-100"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {book.description}
          </p>

          {book.isbn && (
            <div className="flex items-center gap-2 text-gray-500 pt-1">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <code className="text-xs font-mono bg-gray-50 px-2 py-1 rounded">
                {book.isbn}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
