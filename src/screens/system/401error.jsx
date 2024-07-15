import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material'; // Material-UI components

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
      <Box sx={{ mb: 4, color: '#FF6F61', fontSize: '120px', fontWeight: 'bold' }}>
        401
      </Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', mb: 2, fontSize: '4rem' }}>
        Unauthorized
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#555', mb: 4, fontSize: '2rem' }}>
        It seems you dont have the right permissions to access this page. Please login to continue.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirectToLogin}
        sx={{
          fontSize: '2rem',
          backgroundColor: '#FF6F61',
          '&:hover': {
            backgroundColor: '#FF3B30'
          }
        }}
      >
        Go to Login
      </Button>
    </Container>
  );
};

export default UnauthorizedPage;
