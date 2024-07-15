import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

const ConnectError = () => {
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
      <Box sx={{ mb: 4, color: '#187bce', fontSize: '120px', fontWeight: 'bold' }}>
        500
      </Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', mb: 2, fontSize: '4rem' }}>
        The server is having a trouble
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#555', mb: 4, fontSize: '2rem' }}>
        It seems we have encountered an error while connecting to the database. Please contact the admin for assistance.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirectToLogin}
        sx={{
          fontSize: '2rem',
          backgroundColor: '#187bce',
          '&:hover': {
            backgroundColor: '#155b96'
          }
        }}
      >
        Back to Homepage
      </Button>
    </Container>
  );
};
export default ConnectError;
