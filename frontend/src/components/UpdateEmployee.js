import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

function UpdateEmployee() {
  const { id } = useParams();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    department: '',
    date_of_joining: '',
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setForm(response.data.emp);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        alert('Failed to fetch employee details');
        navigate('/employees');
      }
    };
    fetchEmployee();
  }, [id, token, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/emp/employees/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Employee updated successfully');
        navigate('/employees');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
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
        maxWidth: 500,
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#1976d2', fontWeight: 'bold', marginBottom: 3 }}
      >
        Update Employee
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
        <form onSubmit={handleUpdate}>
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
              💾 Save
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

export default UpdateEmployee;