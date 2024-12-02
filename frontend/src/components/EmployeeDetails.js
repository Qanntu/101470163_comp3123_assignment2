import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, Box, Paper } from '@mui/material';


function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
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
        setEmployee(response.data.emp);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        alert('Failed to fetch employee details');
        navigate('/employees'); 
      }
    };
    fetchEmployee();
  }, [id, token, navigate]);

  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  return (
    <Box sx={{ padding: 4, fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        Employee Details
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => navigate('/employees')}
        sx={{
          display: 'block',
          margin: '20px auto',
          padding: '10px 20px',
          fontSize: '16px',
          textTransform: 'capitalize',
        }}
      >
        ⬅️ Back to List
      </Button>
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#ffffff', borderRadius: '10px' }}>
        {[
          { label: 'First Name', value: employee.first_name },
          { label: 'Last Name', value: employee.last_name },
          { label: 'Email', value: employee.email },
          { label: 'Position', value: employee.position },
          { label: 'Salary', value: `$${employee.salary}` },
          { label: 'Department', value: employee.department },
          { label: 'Date of Joining', value: new Date(employee.date_of_joining).toLocaleDateString() },
          { label: 'Last Updated', value: new Date(employee.updated_at).toLocaleDateString() },
        ].map((field, index) => (
          <Box key={index} sx={{ marginBottom: 3, padding: '10px', backgroundColor: '#f4f6f8', borderRadius: '8px' }}>
            <Typography variant="body1" sx={{ color: '#0d47a1', fontWeight: 'bold' }}>
              {field.label}:
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
              {field.value}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default EmployeeDetail;