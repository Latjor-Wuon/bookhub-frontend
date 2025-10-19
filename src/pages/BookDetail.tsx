import React, { useEffect, useState } from 'react';
import {
  Grid,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  Fade,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as ViewIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Language as LanguageIcon,
  Pages as PagesIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchBookById } from '../store/slices/booksSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`book-tabpanel-${index}`}
      aria-labelledby={`book-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentBook, isLoading, error } = useSelector(
    (state: RootState) => state.books
  );

  const [tabValue, setTabValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
  }, [dispatch, id]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    if (navigator.share && currentBook) {
      try {
        await navigator.share({
          title: currentBook.title,
          text: `Check out "${currentBook.title}" by ${currentBook.author}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGenreColor = (genre: string) => {
    const colors = {
      'Fiction': '#FF6B6B',
      'Fantasy': '#4ECDC4',
      'Science Fiction': '#45B7D1',
      'Mystery': '#96CEB4',
      'Romance': '#FFEAA7',
      'Thriller': '#DDA0DD',
      'Biography': '#98D8C8',
      'History': '#F7DC6F',
      'Self-Help': '#BB8FCE',
      'Business': '#85C1E9',
      'Technology': '#F8C471',
      'Health': '#82E0AA',
      'Travel': '#F1948A',
      'Cooking': '#F7DC6F',
      'Art': '#D7BDE2',
      'Poetry': '#AED6F1',
      'Drama': '#A9DFBF',
      'Comedy': '#F9E79F',
      'Horror': '#F1948A',
      'Non-Fiction': '#D5DBDB'
    };
    return colors[genre as keyof typeof colors] || '#E8E8E8';
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading book details...
        </Typography>
      </Box>
    );
  }

  if (error || !currentBook) {
    return (
      <Box sx={{ py: 4, px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 } }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Book not found'}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back to Books
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Breadcrumbs */}
      <Box sx={{ pt: 3, px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 } }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link 
            color="inherit" 
            href="/" 
            onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/'); }}
            sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Home
          </Link>
          <Link 
            color="inherit" 
            href={`/genre/${currentBook.genre.toLowerCase()}`}
            sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            {currentBook.genre}
          </Link>
          <Typography color="text.primary">{currentBook.title}</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ pb: 6, px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 } }}>
        <Fade in={true} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Grid container spacing={0}>
              {/* Book Cover Section */}
              <Grid item xs={12} md={4}>
                <Box sx={{ position: 'relative', height: { xs: 400, md: 600 } }}>
                  <CardMedia
                    component="img"
                    image={currentBook.coverImage || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80'}
                    alt={currentBook.title}
                    sx={{
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80';
                    }}
                  />
                  
                  {/* Overlay Actions */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                      <IconButton
                        onClick={handleToggleFavorite}
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(10px)',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,1)',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        {isFavorite ? (
                          <FavoriteIcon color="error" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}>
                      <IconButton
                        onClick={handleToggleBookmark}
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(10px)',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,1)',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        {isBookmarked ? (
                          <BookmarkIcon color="primary" />
                        ) : (
                          <BookmarkBorderIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Share">
                      <IconButton
                        onClick={handleShare}
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(10px)',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,1)',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Genre Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: 16,
                    }}
                  >
                    <Chip
                      label={currentBook.genre}
                      sx={{
                        backgroundColor: getGenreColor(currentBook.genre),
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Book Details Section */}
              <Grid item xs={12} md={8}>
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="h3" 
                      component="h1" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 800,
                        fontSize: { xs: '1.8rem', md: '2.5rem' },
                        lineHeight: 1.2,
                        mb: 2,
                        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {currentBook.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 500 }}>
                        by {currentBook.author}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Rating 
                        value={currentBook.rating} 
                        precision={0.1} 
                        size="large" 
                        readOnly 
                      />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {currentBook.rating.toFixed(1)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ({Math.floor(Math.random() * 500) + 50} reviews)
                      </Typography>
                    </Box>
                  </Box>

                  {/* Quick Info */}
                  <Box sx={{ mb: 4 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                          <CalendarIcon sx={{ color: 'primary.main', mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Published
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {formatDate(currentBook.publicationDate)}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                          <PagesIcon sx={{ color: 'primary.main', mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Pages
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {Math.floor(Math.random() * 400) + 200}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                          <LanguageIcon sx={{ color: 'primary.main', mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Language
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            English
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                          <MoneyIcon sx={{ color: 'primary.main', mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Price
                          </Typography>
                          <Typography variant="body1" fontWeight={600} color="primary">
                            ${currentBook.price.toFixed(2)}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<ShoppingCartIcon />}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                        boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                          boxShadow: '0 6px 20px rgba(102,126,234,0.6)',
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<ViewIcon />}
                      sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: 600 }}
                    >
                      Preview
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<BookmarkIcon />}
                      onClick={handleToggleBookmark}
                      sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: 600 }}
                    >
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </Button>
                  </Box>

                  {/* Tabs */}
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                      <Tab label="Description" />
                      <Tab label="Reviews" />
                      <Tab label="Details" />
                      <Tab label="Similar Books" />
                    </Tabs>
                  </Box>

                  <TabPanel value={tabValue} index={0}>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                      {showFullDescription 
                        ? currentBook.description 
                        : `${currentBook.description.substring(0, 300)}...`
                      }
                    </Typography>
                    {currentBook.description.length > 300 && (
                      <Button
                        variant="text"
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        sx={{ textTransform: 'none' }}
                      >
                        {showFullDescription ? 'Show Less' : 'Read More'}
                      </Button>
                    )}
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Customer Reviews
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={currentBook.rating} precision={0.1} readOnly size="large" />
                        <Typography variant="h6" sx={{ ml: 2 }}>
                          {currentBook.rating.toFixed(1)} out of 5
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Sample Reviews */}
                    <List>
                      {[1, 2, 3].map((_, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {String.fromCharCode(65 + index)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                  Customer {index + 1}
                                </Typography>
                                <Rating value={5 - index} size="small" readOnly />
                              </Box>
                            }
                            secondary={
                              <Typography variant="body2" color="text.secondary">
                                {index === 0 
                                  ? "Absolutely loved this book! The story was captivating and the characters were well-developed."
                                  : index === 1
                                  ? "Great read, highly recommend to anyone interested in this genre."
                                  : "Good book overall, though it took a while to get into."
                                }
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>

                  <TabPanel value={tabValue} index={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                          Book Information
                        </Typography>
                        <List>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText
                              primary="ISBN"
                              secondary="978-0-123456-78-9"
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText
                              primary="Publisher"
                              secondary="BookHub Publishing"
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText
                              primary="Format"
                              secondary="Paperback, Hardcover, eBook"
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText
                              primary="Dimensions"
                              secondary="8.5 x 5.5 x 1 inches"
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                          Additional Details
                        </Typography>
                        <List>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText
                              primary="Language"
                              secondary="English"
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText
                              primary="Age Range"
                              secondary="Adult"
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText
                              primary="Availability"
                              secondary="In Stock"
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText
                              primary="Shipping"
                              secondary="Free on orders over $25"
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </TabPanel>

                  <TabPanel value={tabValue} index={3}>
                    <Typography variant="h6" gutterBottom>
                      You might also like
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Similar books will be displayed here based on genre and author.
                    </Typography>
                  </TabPanel>
                </CardContent>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
};

export default BookDetail;