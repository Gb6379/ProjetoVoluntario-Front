import ConfigSidebar from '@/components/configSidebar';
import Sidebar from '@/components/sidebar/sidebar'
import { useAuth } from '@/modules/AuthContext';
import { CircularProgress } from '@mui/material';
import jwt, { JwtPayload } from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';

interface MyTokenPayload extends JwtPayload {
  roleId: number;
}

const UserSettings: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [accessDenied, setAccessDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roleId, setRoleId] = useState<number | null>(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      try {
        const decodedToken = jwt.decode(accessToken) as MyTokenPayload;
        setRoleId(decodedToken?.roleId || null);

        if (decodedToken?.roleId === 3) {
          setLoading(false);
        } else if (decodedToken?.roleId === 2) {
          setLoading(false);
        } else {
          setLoading(false);
          setAccessDenied(true);
        }
      } catch (error) {
        setLoading(false);
        setAccessDenied(true);
      }
    } else {
      setLoading(false);
      setAccessDenied(true);
    }
  }, []);

  return (
        <div>
            <ConfigSidebar />
        </div>
  );
};

export default UserSettings;
