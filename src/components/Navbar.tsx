import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Login,
  PersonAdd,
  Logout,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout() as any);
    handleMenuClose();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    if (searchQuery.trim()) {
      // Navigate to home page with search parameter
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      // If search is empty, navigate to home page to show all books
      navigate('/');
    }
    
    // Clear the search query after navigation
    setSearchQuery('');
    
    // Reset loading state after a short delay
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 320, height: '100%', bgcolor: '#fafafa' }}>
      <Box sx={{ p: 4, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo variant="small" />
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#666666' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      
      <List sx={{ px: 3, py: 2 }}>
        <ListItem 
          button 
          onClick={() => { navigate('/'); handleDrawerToggle(); }}
          sx={{ 
            borderRadius: 3, 
            mb: 1, 
            '&:hover': { 
              bgcolor: '#f0f7ff',
              '& .MuiListItemIcon-root': { color: '#1976d2' }
            } 
          }}
        >
          <ListItemIcon>
            <SearchIcon sx={{ color: '#666666' }} />
          </ListItemIcon>
          <ListItemText primary="Browse Books" />
        </ListItem>
        
        {isAuthenticated ? (
          <>
            <Divider sx={{ my: 2 }} />
            <ListItem 
              button 
              onClick={handleLogout}
              sx={{ 
                borderRadius: 3, 
                mb: 1, 
                '&:hover': { 
                  bgcolor: '#ffebee',
                  '& .MuiListItemIcon-root': { color: '#d32f2f' }
                } 
              }}
            >
              <ListItemIcon>
                <Logout sx={{ color: '#666666' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem 
              button 
              onClick={() => { navigate('/login'); handleDrawerToggle(); }}
              sx={{ 
                borderRadius: 3, 
                mb: 1, 
                '&:hover': { 
                  bgcolor: '#f0f7ff',
                  '& .MuiListItemIcon-root': { color: '#1976d2' }
                } 
              }}
            >
              <ListItemIcon>
                <Login sx={{ color: '#666666' }} />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => { navigate('/register'); handleDrawerToggle(); }}
              sx={{ 
                borderRadius: 3, 
                mb: 1, 
                '&:hover': { 
                  bgcolor: '#f0f7ff',
                  '& .MuiListItemIcon-root': { color: '#1976d2' }
                } 
              }}
            >
              <ListItemIcon>
                <PersonAdd sx={{ color: '#666666' }} />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ 
          minHeight: 72, 
          py: 1,
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: '100%',
          mx: 'auto',
          width: '100%'
        }}>
          {/* Left Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { xs: 'flex', md: 'none' },
                mr: 2,
                color: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.2)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Logo */}
            <Box 
              onClick={() => navigate('/')}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease'
                }
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: '#1976d2',
                  textShadow: '0 2px 4px rgba(255,255,255,0.3)',
                  letterSpacing: '0.5px',
                }}
              >
                BookHub
              </Typography>
            </Box>
          </Box>

          {/* Center Section - Desktop Search */}
          {!isMobile && (
            <Box sx={{ 
              flex: 1, 
              maxWidth: 500, 
              mx: 4,
              position: 'relative'
            }}>
              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: 25,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
                    transform: 'translateY(-1px)'
                  },
                  '&:focus-within': { 
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <InputAdornment position="start" sx={{ ml: 2 }}>
                  <SearchIcon sx={{ color: '#666', fontSize: '1.2rem' }} />
                </InputAdornment>
                <TextField
                  fullWidth
                  placeholder="Search books, authors, or genres..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
                  aria-label="Search books"
                  InputProps={{
                    sx: {
                      fontSize: '0.95rem',
                      color: '#333',
                      '& input': { 
                        py: '14px',
                        fontSize: '0.95rem',
                        '&::placeholder': {
                          color: '#999',
                          opacity: 1,
                        },
                      }
                    }
                  }}
                  variant="standard"
                />
                {searchQuery && (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={handleClearSearch} 
                      size="small" 
                      sx={{ 
                        mr: 1,
                        color: '#666',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.05)',
                        }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  aria-label="Search books"
                  disabled={isSearching}
                  sx={{
                    borderRadius: '0 25px 25px 0',
                    height: 50,
                    minWidth: 80,
                    backgroundColor: isSearching ? '#1565c0' : '#1976d2',
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: isSearching ? '#1565c0' : '#1565c0',
                      boxShadow: '0 4px 15px rgba(25, 118, 210, 0.4)',
                    },
                    '&:disabled': {
                      backgroundColor: '#1565c0',
                      color: 'white',
                    }
                  }}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </Box>
            </Box>
          )}

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {!isMobile && (
              <>
                {isAuthenticated ? (
                  <>
                    {/* Quick Actions */}
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': { 
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                    
                    <IconButton
                      sx={{
                        color: '#1976d2',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        '&:hover': { 
                          backgroundColor: 'rgba(25, 118, 210, 0.2)',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <NotificationsIcon />
                    </IconButton>

                    
                    <IconButton
                      onClick={handleMenuOpen}
                      sx={{
                        ml: 1,
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        '&:hover': { 
                          backgroundColor: 'rgba(25, 118, 210, 0.2)',
                          transform: 'scale(1.05)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: '#1976d2',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                      }}>
                        {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                    </IconButton>
                    
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: {
                          mt: 2,
                          borderRadius: 3,
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                          border: '1px solid #e0e0e0',
                          minWidth: 220,
                          overflow: 'hidden'
                        }
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <Box sx={{ px: 3, py: 2, bgcolor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
                        <Typography variant="caption" sx={{ color: '#666666', display: 'block' }}>
                          Welcome back
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                          {user?.fullName || 'User'}
                        </Typography>
                      </Box>
                      <MenuItem 
                        onClick={() => { navigate('/profile'); handleMenuClose(); }}
                        sx={{ 
                          py: 1.5,
                          '&:hover': { bgcolor: '#f0f7ff' }
                        }}
                      >
                        <ListItemIcon>
                          <AccountCircle sx={{ color: '#666666' }} />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </MenuItem>
                      <Divider />
                      <MenuItem 
                        onClick={handleLogout} 
                        sx={{ 
                          color: '#d32f2f',
                          py: 1.5,
                          '&:hover': { bgcolor: '#ffebee' }
                        }}
                      >
                        <ListItemIcon>
                          <Logout sx={{ color: '#d32f2f' }} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<Login />}
                      onClick={() => navigate('/login')}
                      sx={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        fontWeight: 600,
                        px: 3,
                        py: 1.2,
                        borderRadius: 3,
                        textTransform: 'none',
                        '&:hover': { 
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-1px)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<PersonAdd />}
                      onClick={() => navigate('/register')}
                      sx={{
                        backgroundColor: '#ffffff',
                        color: '#1976d2',
                        fontWeight: 600,
                        px: 3,
                        py: 1.2,
                        borderRadius: 3,
                        textTransform: 'none',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        '&:hover': { 
                          backgroundColor: '#f5f5f5',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                          transform: 'translateY(-1px)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </>
            )}

            {/* Mobile search button */}
            {isMobile && (
              <IconButton 
                onClick={() => navigate('/')} 
                sx={{
                  color: '#666666',
                  bgcolor: '#f5f5f5',
                  '&:hover': { 
                    bgcolor: '#e3f2fd',
                    color: '#1976d2',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <SearchIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { 
            width: 320,
            borderRadius: '0 16px 16px 0',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;