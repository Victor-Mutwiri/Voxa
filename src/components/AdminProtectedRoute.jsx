import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../supabaseClient';
import useStore from '../useStore';

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { resetStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        resetStore();
        localStorage.clear();
        navigate('/adminauth'); // 👈 redirect to admin login
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_OUT') {
          resetStore();
          localStorage.clear();
          navigate('/adminauth');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, resetStore]);

  if (loading) return null;

  return children;
};

export default AdminProtectedRoute;
