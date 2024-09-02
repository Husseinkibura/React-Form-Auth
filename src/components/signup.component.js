import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Grid, Box, Typography, Container, Link } from '@mui/material';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/sign-up', {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success('User created successfully!');
        setTimeout(() => {
          navigate('/sign-in');
        }, 2000); // Redirect to the sign-in page after a delay
      }
    } catch (error) {
      console.error('There was an error signing up:', error);
      toast.error('Failed to sign up. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
          border: '1px solid #ddd', // Border around the form
          borderRadius: '8px', // Rounded corners
          boxShadow: 3, // Shadow effect for depth
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff', // Background color of the form
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                helperText="Enter your first name"
                sx={{ border: '1px solid #ddd', borderRadius: '4px' }} // Border for input fields
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                helperText="Enter your last name"
                sx={{ border: '1px solid #ddd', borderRadius: '4px' }} // Border for input fields
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText="Enter a valid email address"
                sx={{ border: '1px solid #ddd', borderRadius: '4px' }} // Border for input fields
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText="Enter a strong password"
                sx={{ border: '1px solid #ddd', borderRadius: '4px' }} // Border for input fields
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              borderRadius: '4px', // Rounded corners for the button
              border: '1px solid transparent', // Border for button
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ToastContainer position="top-right" />
    </Container>
  );
};

export default SignUp;
