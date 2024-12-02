import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import './main.css';

function AddEmployee() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    department: '',
    date_of_joining: ''
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/emp', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert('Employee added successfully');
        navigate('/employees');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee');
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          color: '#1976d2',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        Add Employee
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <form onSubmit={handleSubmit}>
          {[
            { label: 'First Name', type: 'text', value: form.first_name, field: 'first_name' },
            { label: 'Last Name', type: 'text', value: form.last_name, field: 'last_name' },
            { label: 'Email', type: 'email', value: form.email, field: 'email' },
            { label: 'Position', type: 'text', value: form.position, field: 'position' },
            { label: 'Salary', type: 'number', value: form.salary, field: 'salary' },
            { label: 'Department', type: 'text', value: form.department, field: 'department' },
            { label: 'Date of Joining', type: 'date', value: form.date_of_joining, field: 'date_of_joining' },
          ].map((field, index) => (
            <Box key={index} sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                label={field.label}
                type={field.type}
                InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                variant="outlined"
                value={field.value}
                onChange={(e) => setForm({ ...form, [field.field]: e.target.value })}
                required
              />
            </Box>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
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
              ✅ Add
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate('/employees')}
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                textTransform: 'capitalize',
              }}
            >
              ❌ Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default AddEmployee;