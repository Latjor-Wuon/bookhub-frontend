import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Book as BookIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchBooks, toggleFavorite } from '../store/slices/booksSlice';
import type { Book } from '../types';

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { books, favorites, isLoading } = useSelector((state: RootState) => state.books);
  
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
  });
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchBooks({ page: 1, filters: {} }));
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (books.length > 0) {
      // Filter books that user might have created (simplified logic)
      const userCreatedBooks = books.filter((_, index) => index % 3 === 0);
      setUserBooks(userCreatedBooks);
      
      // Filter favorite books
      const favBooks = books.filter(book => favorites.includes(book._id));
      setFavoriteBooks(favBooks);
    }
  }, [books, favorites]);

  const handleEditProfile = () => {
    setEditForm({
      fullName: user?.fullName || '',
      email: user?.email || '',
    });
    setShowEditDialog(true);
  };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to update the user profile
    console.log('Saving profile:', editForm);
    setShowEditDialog(false);
    // For now, just close the dialog
  };

  const handleCancelEdit = () => {
    setShowEditDialog(false);
    setEditForm({
      fullName: user?.fullName || '',
      email: user?.email || '',
    });
  };

  const handleToggleFavorite = (bookId: string) => {
    dispatch(toggleFavorite(bookId));
  };


  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ textAlign: 'center' }}>
          Please log in to view your profile.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Card sx={{ mb: 4, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: '#1976d2',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {getInitials(user?.fullName || 'User')}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
                {user?.fullName || 'User'}
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666', mb: 2 }}>
                {user?.email || 'user@example.com'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Chip
                  icon={<BookIcon />}
                  label={`${userBooks.length} Books Created`}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<FavoriteIcon />}
                  label={`${favoriteBooks.length} Favorites`}
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditProfile}
              sx={{ borderRadius: 2 }}
            >
              Edit Profile
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* User's Books Section */}
      <Card sx={{ mb: 4, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#1a1a1a' }}>
            My Books
          </Typography>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : userBooks.length > 0 ? (
            <Grid container spacing={3}>
              {userBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book._id}>
                  <Card sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    }
                  }}>
                    <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <img
                        src={book.coverImage || 'https://via.placeholder.com/300x400?text=No+Cover'}
                        alt={book.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Cover';
                        }}
                      />
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 12, 
                        right: 12, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 1,
                        opacity: 0,
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
                            <FavoriteIcon sx={{ color: '#ccc' }} />
                          )}
                        </IconButton>
                      </Box>
                      <Chip
                        label={book.genre}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          backgroundColor: '#1976d2',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flex: 1, p: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
                        by {book.author}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.875rem' }}>
                        {book.rating} ⭐ ({book.reviews} reviews)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <BookIcon sx={{ fontSize: 64, color: '#999999', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#666666', mb: 1 }}>
                No books created yet
              </Typography>
              <Typography variant="body2" sx={{ color: '#999999' }}>
                Start creating books to see them here
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Favorite Books Section */}
      <Card sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#1a1a1a' }}>
            Favorite Books
          </Typography>
          {favoriteBooks.length > 0 ? (
            <Grid container spacing={3}>
              {favoriteBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book._id}>
                  <Card sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    }
                  }}>
                    <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <img
                        src={book.coverImage || 'https://via.placeholder.com/300x400?text=No+Cover'}
                        alt={book.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Cover';
                        }}
                      />
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 12, 
                        right: 12, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 1,
                        opacity: 0,
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
                          <FavoriteIcon sx={{ color: '#f44336' }} />
                        </IconButton>
                      </Box>
                      <Chip
                        label={book.genre}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          backgroundColor: '#1976d2',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flex: 1, p: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
                        by {book.author}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.875rem' }}>
                        {book.rating} ⭐ ({book.reviews} reviews)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <FavoriteIcon sx={{ fontSize: 64, color: '#999999', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#666666', mb: 1 }}>
                No favorite books yet
              </Typography>
              <Typography variant="body2" sx={{ color: '#999999' }}>
                Start favoriting books to see them here
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={editForm.fullName}
              onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              margin="normal"
              type="email"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} variant="contained" startIcon={<SaveIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
