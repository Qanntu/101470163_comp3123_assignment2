import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // link to signup page
  const handleSignUpClick = () => {
    navigate('/signup'); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/login', form);
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      navigate('/employees');
    } catch (error) {
      console.error('Signup failed:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#1976d2', fontWeight: 'bold', marginBottom: 3 }}
        >
          Login
        </Typography>
        {error && (
          <Typography
            variant="body1"
            color="error"
            gutterBottom
            align="center"
            sx={{
              backgroundColor: '#ffebee',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: 3,
            }}
          >
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Email or Username"
              variant="outlined"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                textTransform: 'capitalize',
              }}
            >
              🔒 Login
            </Button>
            <Typography variant="body1" align="center" sx={{ color: '#757575', marginTop: 2 }}>
              Don't have an account?
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSignUpClick}
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                textTransform: 'capitalize',
              }}
            >
              ✏️ Sign Up
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;