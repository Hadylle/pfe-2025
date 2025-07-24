import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (token, userRole) => {
      console.log('AuthProvider login called with:', { token, userRole });
      const decoded = jwtDecode(token);
      const userSub = decoded.sub;
    localStorage.setItem('token', token);
   localStorage.setItem('userRole', userRole);
    localStorage.setItem('userSub', userSub);
  setUser({ role: userRole, sub: userSub });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
     console.log('AuthProvider useEffect — token:', token);
  console.log('AuthProvider useEffect — userRole:', userRole);
    if (token && userRole) {
      setUser({ role: userRole });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
