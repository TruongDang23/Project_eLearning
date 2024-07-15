import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material'; // Material-UI components

const ForbiddenPage = () => {
  const navigate = useNavigate();

  const handleRedirectToHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
      <Box sx={{ mb: 4, color: '#FF3B30', fontSize: '120px', fontWeight: 'bold' }}>
        403
      </Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', mb: 2, fontSize: '4rem' }}>
        Forbidden
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#555', mb: 4, fontSize: '2rem' }}>
        You do not have permission to access this page. Please return to the homepage.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirectToHome}
        sx={{
          fontSize: '2rem',
          backgroundColor: '#FF3B30',
          '&:hover': {
            backgroundColor: '#BF2D1F'
          }
        }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default ForbiddenPage;
