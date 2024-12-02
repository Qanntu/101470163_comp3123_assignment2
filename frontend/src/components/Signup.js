import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/user/signup', form);
      alert('User registered successfully');
      navigate('/login')
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
        backgroundColor: '#f9f9f9',
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
          Signup
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
        <form onSubmit={handleSignup}>
          {[
            { label: 'Username', type: 'text', value: form.username, field: 'username' },
            { label: 'Email', type: 'email', value: form.email, field: 'email' },
            { label: 'Password', type: 'password', value: form.password, field: 'password' },
          ].map((field, index) => (
            <Box key={index} sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                label={field.label}
                type={field.type}
                variant="outlined"
                value={field.value}
                onChange={(e) => setForm({ ...form, [field.field]: e.target.value })}
                required
                sx={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: '5px',
                }}
              />
            </Box>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginTop: 3 }}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                textTransform: 'capitalize',
              }}
            >
              ✅ Signup
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                textTransform: 'capitalize',
              }}
            >
              🔙 Back to Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default Signup;