import ProtectedRoute from '../../components/ProtectedRoute';
import { Typography, Container, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth');
  };

  return (
    // <ProtectedRoute>
      <Container maxWidth="lg" className="min-h-screen flex flex-col items-center justify-center">
        <Typography variant="h4" className="mb-4">
          Welcome to the Dashboard page
        </Typography>
        <Button
          variant="contained"
          className="bg-red-600 hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Container>
    // </ProtectedRoute>
  );
}