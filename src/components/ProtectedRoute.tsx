import { useRouter } from 'next/router';
import { useEffect, useState, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth');
      return;
    }

    setIsLoading(false);
  }, [router]);

  console.log('isAuthenticated', isAuthenticated);
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;