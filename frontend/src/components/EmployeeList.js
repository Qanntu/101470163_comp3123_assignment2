import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';


function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState(''); 
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

// londing employee list 
  useEffect(() => {
    fetchEmployees(); 
    }, [token]);
  
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/emp', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (response.data && response.data.emp) {
        setEmployees(response.data.emp);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

//  button function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDelete = async(id) =>{
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/emp`, {
          params: { eid: id },
          headers: {
          Authorization: `Bearer ${token}`,
          },
        });
        alert('Employee deleted successfully');

        setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      fetchEmployees();
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/search/${searchText}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (response.data && response.data.employees) {
        setEmployees(response.data.employees);
      }
    } catch (error) {
      console.error('Error searching employees:', error);
      alert('No employees found matching the criteria');
      setEmployees([]); 
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="searchbar" style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ color: '#1976d2' }}>Search Employees</h2>
        <TextField
          label="Search by Department or Position"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '50%', marginBottom: '10px' }}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ padding: '10px 30px', fontSize: '16px' }}
          onClick={handleSearch}
        >
          🔍 Search
        </Button>
      </div>

      <div className="list" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ color: '#1976d2', textAlign: 'center', marginBottom: '20px' }}>Employee List</h1>
        <Button
          variant="contained"
          color="success"
          size="large"
          style={{ display: 'block', margin: '20px auto' }}
          onClick={() => navigate('/add')}
        >
          ➕ Add Employee
        </Button>
        <Table style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', overflow: 'hidden' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#1976d2' }}>
              <TableCell style={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell style={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell style={{ color: '#ffffff', fontWeight: 'bold' }}>Position</TableCell>
              <TableCell style={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee._id} style={{ borderBottom: '1px solid #eeeeee' }}>
                  <TableCell>{employee._id}</TableCell>
                  <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginRight: '10px' }}
                      onClick={() => navigate(`/update/${employee._id}`)}
                    >
                      ✏️ Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginRight: '10px' }}
                      onClick={() => navigate(`/employee/${employee._id}`)}
                    >
                      👁️ View
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(employee._id)}
                    >
                      ❌ Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" style={{ color: '#757575', padding: '20px' }}>
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default EmployeeList;