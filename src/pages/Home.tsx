import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Alert,
  Fade,
  Paper,
  InputAdornment,
  IconButton,
  Skeleton,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  MenuBook as MenuBookIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Clear as ClearIcon,
  Sort as SortIcon,
  ViewModule as GridIcon,
  ViewList as ListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchBooks, setFilters, setCurrentPage, clearFilters, toggleFavorite, updateBook, deleteBook } from '../store/slices/booksSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Book } from '../types';

// Book List Item Component for List View
const BookListItem: React.FC<{ 
  book: Book; 
  onEdit: (bookId: string) => void; 
  onDelete: (bookId: string) => void; 
}> = ({ book, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.books);
  const { isAuthenticated } = useAuth();

  const handleBookClick = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  const handleToggleFavorite = (bookId: string) => {
    dispatch(toggleFavorite(bookId));
  };


  return (
    <Card 
      sx={{ 
        display: 'flex', 
        mb: 2, 
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': { 
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-2px)'
        }
      }}
      onClick={() => handleBookClick(book._id)}
    >
      <CardMedia
        component="img"
        sx={{ 
          width: 120, 
          height: 160, 
          objectFit: 'cover',
          borderRadius: '8px 0 0 8px'
        }}
        image={book.coverImage || 'https://via.placeholder.com/300x400?text=No+Cover'}
        alt={book.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Cover';
        }}
      />
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Chip 
              label={book.genre} 
              size="small" 
              sx={{ 
                backgroundColor: '#e3f2fd', 
                color: '#1976d2', 
                fontWeight: 600,
                fontSize: '0.75rem'
              }} 
            />
            {book.rating >= 4.5 && (
              <Chip 
                label="★ Top Rated" 
                size="small" 
                sx={{ 
                  backgroundColor: '#fff3e0', 
                  color: '#f57c00', 
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }} 
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(book._id);
              }}
              sx={{ 
                color: favorites.includes(book._id) ? '#f44336' : '#ccc',
                '&:hover': { color: '#f44336' }
              }}
            >
              {favorites.includes(book._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            
            {/* CRUD Buttons for Authenticated Users */}
            {isAuthenticated && (
              <>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(book._id);
                  }}
                  sx={{ 
                    color: '#1976d2',
                    '&:hover': { 
                      color: '#1565c0',
                      backgroundColor: 'rgba(25, 118, 210, 0.1)'
                    }
                  }}
                  title="Edit Book"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(book._id);
                  }}
                  sx={{ 
                    color: '#f44336',
                    '&:hover': { 
                      color: '#d32f2f',
                      backgroundColor: 'rgba(244, 67, 54, 0.1)'
                    }
                  }}
                  title="Delete Book"
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
        
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
          {book.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <PersonIcon sx={{ fontSize: 16, color: '#666666' }} />
          <Typography variant="body2" sx={{ color: '#666666' }}>
            {book.author}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating 
            value={book.rating} 
            precision={0.1} 
            readOnly 
            size="small"
            sx={{ '& .MuiRating-iconFilled': { color: '#ffc107' } }}
          />
          <Typography variant="body2" sx={{ color: '#666666' }}>
            {book.rating} ({book.reviews} reviews)
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <CalendarIcon sx={{ fontSize: 16, color: '#666666' }} />
          <Typography variant="body2" sx={{ color: '#666666' }}>
            {new Date(book.publicationDate).toLocaleDateString()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <MoneyIcon sx={{ fontSize: 16, color: '#666666' }} />
          <Typography variant="body2" sx={{ color: '#666666', fontWeight: 600 }}>
            ${book.price}
          </Typography>
        </Box>
        
        <Typography variant="body2" sx={{ color: '#666666', mb: 2, lineHeight: 1.5 }}>
          {book.description.length > 150 ? `${book.description.substring(0, 150)}...` : book.description}
        </Typography>
        
        {/* CRUD Buttons for Authenticated Users */}
        {isAuthenticated && (
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            mb: 2,
            justifyContent: 'flex-start'
          }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(book._id);
              }}
              sx={{
                borderColor: '#1976d2',
                color: '#1976d2',
                '&:hover': { 
                  borderColor: '#1565c0',
                  backgroundColor: 'rgba(25, 118, 210, 0.1)'
                },
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(book._id);
              }}
              sx={{
                borderColor: '#f44336',
                color: '#f44336',
                '&:hover': { 
                  borderColor: '#d32f2f',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)'
                },
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Delete
            </Button>
          </Box>
        )}
        
        <Button
          variant="contained"
          startIcon={<ViewIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleBookClick(book._id);
          }}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const { books, filters, pagination, isLoading, error } = useSelector(
    (state: RootState) => state.books
  );

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Edit dialog state
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    author: '',
    genre: '',
    price: 0,
    description: '',
    rating: 0,
    reviews: 0,
    publicationDate: ''
  });

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
    'Fantasy', 'Thriller', 'Biography', 'History', 'Self-Help',
    'Business', 'Technology', 'Health', 'Travel', 'Cooking',
    'Art', 'Poetry', 'Drama', 'Comedy', 'Horror'
  ];

  useEffect(() => {
    dispatch(fetchBooks({ page: pagination.currentPage, filters }));
  }, [dispatch, pagination.currentPage, filters]);

  const handleEditBook = (bookId: string) => {
    const book = books.find((b: any) => b._id === bookId);
    if (book) {
      setEditingBook(book);
      setEditForm({
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: book.price,
        description: book.description,
        rating: book.rating,
        reviews: book.reviews || 0,
        publicationDate: book.publicationDate
      });
      setShowEditDialog(true);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    const book = books.find((b: any) => b._id === bookId);
    if (book && window.confirm(`Are you sure you want to delete "${book.title}"? This action cannot be undone.`)) {
      try {
        await dispatch(deleteBook(bookId)).unwrap();
        // Refresh the books list after deletion
        dispatch(fetchBooks({ page: 1, filters: {} }));
        alert(`Book "${book.title}" has been deleted successfully!`);
      } catch (error: any) {
        console.error('Error deleting book:', error);
        alert(`Failed to delete book: ${error.message || 'Unknown error'}`);
      }
    }
  };

  // Handle URL search parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      dispatch(setFilters({ search: searchParam }));
    } else {
      // Clear search if no search parameter
      dispatch(setFilters({ search: '' }));
    }
  }, [dispatch, location.search]);

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };


  const handleSaveEdit = async () => {
    if (!editingBook) return;
    
    try {
      await dispatch(updateBook({ 
        id: editingBook._id, 
        bookData: editForm 
      })).unwrap();
      
      setShowEditDialog(false);
      setEditingBook(null);
      dispatch(fetchBooks({ page: pagination.currentPage, filters })); // Refresh the books list
      alert(`Book "${editForm.title}" has been updated successfully!`);
    } catch (error: any) {
      console.error('Error updating book:', error);
      alert(`Failed to update book: ${error.message || 'Unknown error'}`);
    }
  };

  const handleCancelEdit = () => {
    setShowEditDialog(false);
    setEditingBook(null);
    setEditForm({
      title: '',
      author: '',
      genre: '',
      price: 0,
      description: '',
      rating: 0,
      reviews: 0,
      publicationDate: ''
    });
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  const handleToggleFavorite = (bookId: string) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      'Fiction': '#1976d2',
      'Fantasy': '#9c27b0',
      'Science Fiction': '#00bcd4',
      'Mystery': '#673ab7',
      'Romance': '#e91e63',
      'Thriller': '#f44336',
      'Biography': '#4caf50',
      'History': '#ff9800',
      'Self-Help': '#8bc34a',
      'Business': '#3f51b5',
      'Technology': '#00bcd4',
      'Health': '#4caf50',
      'Travel': '#ff9800',
      'Cooking': '#f44336',
      'Art': '#673ab7',
      'Poetry': '#e91e63',
      'Drama': '#00bcd4',
      'Comedy': '#8bc34a',
      'Horror': '#f44336',
      'Non-Fiction': '#666666'
    };
    return colors[genre] || '#666666';
  };

  // Generate proper book cover images
  const getBookCoverImage = (book: Book) => {
    if (book.coverImage && book.coverImage !== '/api/placeholder/400/600') {
      return book.coverImage;
    }
    
    // Generate unique book cover based on book title, author, and genre hash
    const bookImages = [
      // Classic Literature & Books
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format&q=80',
      
      // Additional diverse book covers
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop&auto=format&q=80',
      
      // More book covers for variety
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop&auto=format&q=80',
      
      // Even more variety
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop&auto=format&q=80',
      
      // Additional unique book covers
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop&auto=format&q=80'
    ];
    
    // Create a more sophisticated hash from book title, author, and genre for better distribution
    let hash = 0;
    const combinedString = book.title + book.author + book.genre;
    for (let i = 0; i < combinedString.length; i++) {
      const char = combinedString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Use a larger range to ensure better distribution
    const imageIndex = Math.abs(hash) % bookImages.length;
    return bookImages[imageIndex];
  };

  const BookCard: React.FC<{ book: Book; onEdit: (bookId: string) => void; onDelete: (bookId: string) => void }> = ({ book, onEdit, onDelete }) => (
    <Card 
      className="book-card"
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }
      }}
      onClick={() => handleBookClick(book._id)}
    >
      <Box sx={{ position: 'relative', height: 240, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="240"
          image={getBookCoverImage(book)}
          alt={book.title}
          sx={{ 
            objectFit: 'cover',
            backgroundColor: '#f5f5f5',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.05)' }
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80';
          }}
        />
        
        {/* Genre Chip */}
        <Chip
          label={book.genre}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: getGenreColor(book.genre),
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
        
        {/* Action Buttons */}
        <Box sx={{ 
          position: 'absolute', 
          top: 12, 
          right: 12, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1,
          opacity: isAuthenticated ? 0.7 : 0,
          transition: 'opacity 0.3s ease',
          '&:hover': { opacity: 1 }
        }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(book._id);
            }}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { backgroundColor: 'white' },
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            {favorites.includes(book._id) ? (
              <FavoriteIcon sx={{ color: '#f44336' }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          
          {/* CRUD Buttons for Authenticated Users */}
          {isAuthenticated && (
            <>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(book._id);
                }}
                sx={{
                  backgroundColor: 'rgba(25, 118, 210, 0.9)',
                  color: 'white',
                  '&:hover': { 
                    backgroundColor: '#1976d2',
                    transform: 'scale(1.1)'
                  },
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
                title="Edit Book"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(book._id);
                }}
                sx={{
                  backgroundColor: 'rgba(244, 67, 54, 0.9)',
                  color: 'white',
                  '&:hover': { 
                    backgroundColor: '#d32f2f',
                    transform: 'scale(1.1)'
                  },
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
                title="Delete Book"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
          
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleBookClick(book._id);
            }}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { backgroundColor: 'white' },
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ViewIcon />
          </IconButton>
        </Box>
        
        {/* Top Rated Badge */}
        {book.rating >= 4.5 && (
          <Box sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            backdropFilter: 'blur(10px)'
          }}>
            <StarIcon sx={{ color: '#ff9800', fontSize: 16, mr: 0.5 }} />
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
              Top Rated
            </Typography>
          </Box>
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          className="book-title"
          sx={{
            fontSize: '1.1rem',
            fontWeight: 600,
            lineHeight: 1.4,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {book.title}
        </Typography>
        
        <Box className="flex items-center mb-2">
          <PersonIcon sx={{ color: '#666666', fontSize: 16, mr: 0.5 }} />
          <Typography 
            variant="body2" 
            className="book-author"
            sx={{
              color: '#666666',
              fontSize: '0.9rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {book.author}
          </Typography>
        </Box>
        
        <Box className="book-rating mb-2">
          <Rating 
            value={book.rating} 
            precision={0.1} 
            size="small" 
            readOnly 
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#333333' }}>
            {book.rating.toFixed(1)}
          </Typography>
          <Typography variant="body2" sx={{ color: '#999999', ml: 1 }}>
            ({Math.floor(Math.random() * 100) + 10} reviews)
          </Typography>
        </Box>
        
        <Box className="flex items-center mb-3">
          <CalendarIcon sx={{ color: '#666666', fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.9rem' }}>
            {formatDate(book.publicationDate)}
          </Typography>
        </Box>
        
        {book.price > 0 && (
          <Box className="flex items-center mb-3">
            <MoneyIcon sx={{ color: '#1976d2', fontSize: 16, mr: 0.5 }} />
            <Typography variant="h6" className="book-price">
              ${book.price.toFixed(2)}
            </Typography>
          </Box>
        )}
        
        {/* CRUD Buttons for Authenticated Users */}
        {isAuthenticated && (
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            mb: 2,
            justifyContent: 'center'
          }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(book._id);
              }}
              sx={{
                borderColor: '#1976d2',
                color: '#1976d2',
                '&:hover': { 
                  borderColor: '#1565c0',
                  backgroundColor: 'rgba(25, 118, 210, 0.1)'
                },
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(book._id);
              }}
              sx={{
                borderColor: '#f44336',
                color: '#f44336',
                '&:hover': { 
                  borderColor: '#d32f2f',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)'
                },
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Delete
            </Button>
          </Box>
        )}
        
        <Button
          variant="contained"
          fullWidth
          startIcon={<ViewIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleBookClick(book._id);
          }}
          sx={{
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#1565c0' },
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  const BookSkeleton = () => (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={240} />
      <CardContent>
        <Skeleton variant="text" height={32} />
        <Skeleton variant="text" height={24} width="60%" />
        <Skeleton variant="text" height={20} width="40%" />
        <Skeleton variant="rectangular" height={40} sx={{ mt: 2, borderRadius: 2 }} />
      </CardContent>
    </Card>
  );

  return (
    <Box className="app-container" sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Container maxWidth="xl" sx={{ width: '100%', py: 4 }}>
        {/* Clean Controls Section */}
        <Fade in={true} timeout={800}>
          <Paper className="filters-section" elevation={1} sx={{ width: '100%' }}>
            <Box className="filters-header">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant={showFilters ? 'contained' : 'outlined'}
                  startIcon={<FilterIcon />}
                  onClick={() => setShowFilters(!showFilters)}
                  sx={{ borderRadius: 2 }}
                >
                  Filters
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  startIcon={<ClearIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Clear All
                </Button>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton
                    onClick={() => setViewMode('grid')}
                    color={viewMode === 'grid' ? 'primary' : 'default'}
                    size="small"
                  >
                    <GridIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setViewMode('list')}
                    color={viewMode === 'list' ? 'primary' : 'default'}
                    size="small"
                  >
                    <ListIcon />
                  </IconButton>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ color: '#666666' }}>
                  {pagination.totalBooks} books found
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    value={filters.sortBy}
                    label="Sort by"
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    startAdornment={<SortIcon sx={{ mr: 1, color: '#999999' }} />}
                  >
                    <MenuItem value="createdAt">Latest</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="author">Author</MenuItem>
                    <MenuItem value="publicationDate">Publication Date</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {showFilters && (
              <Fade in={showFilters}>
                <Box sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth>
                        <InputLabel>Genre</InputLabel>
                        <Select
                          value={filters.genre}
                          label="Genre"
                          onChange={(e) => handleFilterChange('genre', e.target.value)}
                        >
                          <MenuItem value="">All Genres</MenuItem>
                          {genres.map((genre) => (
                            <MenuItem key={genre} value={genre}>
                              {genre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Min Rating"
                        type="number"
                        value={filters.minRating}
                        onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value) || 0)}
                        inputProps={{ min: 0, max: 5, step: 0.1 }}
                        InputProps={{
                          startAdornment: <StarIcon sx={{ mr: 1, color: '#999999' }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Max Price"
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', parseFloat(e.target.value) || 999999)}
                        inputProps={{ min: 0, step: 0.01 }}
                        InputProps={{
                          startAdornment: <MoneyIcon sx={{ mr: 1, color: '#999999' }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth>
                        <InputLabel>Order</InputLabel>
                        <Select
                          value={filters.sortOrder}
                          label="Order"
                          onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                        >
                          <MenuItem value="desc">Descending</MenuItem>
                          <MenuItem value="asc">Ascending</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            )}
          </Paper>
        </Fade>

        {/* Results Section */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3, borderRadius: 2 }}
            action={
              <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {isLoading ? (
          <>
            {viewMode === 'grid' ? (
              <Grid container spacing={3} className="book-grid">
                {[...Array(8)].map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                    <BookSkeleton />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box>
                {[...Array(6)].map((_, index) => (
                  <Card key={index} sx={{ display: 'flex', mb: 2 }}>
                    <Skeleton variant="rectangular" width={120} height={160} sx={{ borderRadius: '8px 0 0 8px' }} />
                    <CardContent sx={{ flex: 1, p: 3 }}>
                      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
                      <Skeleton variant="text" width="80%" height={16} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="70%" height={16} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="50%" height={16} sx={{ mb: 2 }} />
                      <Skeleton variant="text" width="100%" height={40} sx={{ mb: 1 }} />
                      <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 2 }} />
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </>
        ) : (
          <>
            {books.length === 0 && !isLoading ? (
              <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'white', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                <MenuBookIcon sx={{ fontSize: 64, color: '#999999', mb: 2 }} />
                <Typography variant="h5" sx={{ color: '#666666', mb: 1, fontWeight: 600 }}>
                  No books found
                </Typography>
                <Typography variant="body1" sx={{ color: '#999999', mb: 3 }}>
                  Try adjusting your search criteria or filters
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleClearFilters}
                  startIcon={<ClearIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Clear Filters
                </Button>
              </Box>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <Grid container spacing={3} className={`book-grid ${books.length === 1 ? 'single-book' : books.length === 2 ? 'two-books' : books.length === 3 ? 'three-books' : ''}`}>
                    {books.map((book) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={book._id}>
                        <BookCard book={book} onEdit={handleEditBook} onDelete={handleDeleteBook} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ maxWidth: '100%' }}>
                    {books.map((book) => (
                      <BookListItem 
                        book={book} 
                        key={book._id} 
                        onEdit={handleEditBook}
                        onDelete={handleDeleteBook}
                      />
                    ))}
                  </Box>
                )}
              </>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Edit Book Dialog */}
      <Dialog 
        open={showEditDialog} 
        onClose={handleCancelEdit}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 600 }}>
          Edit Book: {editingBook?.title}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              variant="outlined"
            />
            <TextField
              label="Author"
              fullWidth
              value={editForm.author}
              onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select
                value={editForm.genre}
                label="Genre"
                onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Price"
              fullWidth
              type="number"
              value={editForm.price}
              onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              variant="outlined"
            />
            <TextField
              label="Rating"
              fullWidth
              type="number"
              value={editForm.rating}
              onChange={(e) => setEditForm({ ...editForm, rating: parseFloat(e.target.value) })}
              variant="outlined"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
            />
            <TextField
              label="Reviews"
              fullWidth
              type="number"
              value={editForm.reviews}
              onChange={(e) => setEditForm({ ...editForm, reviews: parseInt(e.target.value) })}
              variant="outlined"
            />
            <TextField
              label="Publication Date"
              fullWidth
              type="date"
              value={editForm.publicationDate.split('T')[0]}
              onChange={(e) => setEditForm({ ...editForm, publicationDate: e.target.value })}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
          <Button 
            onClick={handleCancelEdit} 
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveEdit} 
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;