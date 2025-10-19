import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  IconButton,
  InputAdornment,
  Alert,
  Fade,
  Container,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { register } from '../store/slices/authSlice';
import Logo from '../components/Logo';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })).unwrap();
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the auth slice
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="app-container" sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              maxWidth: 480,
              mx: 'auto'
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Logo variant="large" />
              </Box>
              <Typography variant="h4" sx={{ 
                fontWeight: 800, 
                color: '#1a1a1a', 
                mb: 1,
                letterSpacing: '-0.02em'
              }}>
                REGISTER
              </Typography>
              <Typography variant="body1" sx={{ 
                color: '#666666',
                fontSize: '0.95rem',
                lineHeight: 1.5
              }}>
                Create your account and start discovering amazing books
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Register Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#666666', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    height: 48,
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#666666', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    height: 48,
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#666666', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    height: 48,
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }
                }}
              />


              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                startIcon={<PersonAddIcon />}
                sx={{
                  mb: 3,
                  py: 1.2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  height: 48,
                  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                  '&:hover': { 
                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                    transform: 'translateY(-1px)'
                  },
                  '&:disabled': {
                    background: '#e0e0e0',
                    color: '#999999'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Box>


            {/* Footer Links */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666666' }}>
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: '#1976d2',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Register;