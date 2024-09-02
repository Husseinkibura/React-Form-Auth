import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Box, Typography, Container, FormControlLabel, Checkbox, Link } from '@mui/material';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await axios.post('http://localhost:5000/sign-in', {
        email,
        password,
      });

      if (response.status === 200) {
        // Store the token and redirect to the dashboard
        localStorage.setItem('token', response.data.access_token);
        toast.success('Successfully logged in!');
        this.props.navigate('/dashboard');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      toast.error('Invalid username or password.');
    }
  }

  render() {
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
            Sign In
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={this.handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleInputChange}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={this.state.rememberMe}
                  onChange={this.handleInputChange}
                  color="primary"
                />
              }
              label="Remember me"
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                '& .MuiFormControlLabel-label': {
                  marginLeft: 1, // Margin between checkbox and label
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '4px', // Rounded corners for the button
                border: '1px solid transparent', // Border for button
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Sign In
            </Button>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              <Link href="/sign-up" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
        <ToastContainer position="top-right" />
      </Container>
    );
  }
}

export default function LoginWithNavigate(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}
