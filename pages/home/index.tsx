//import AccessDenied from '@/components/commonComponents/accessDenied';
import AccessDenied from '@/components/accessDenied';
import HomePageInstitution from '@/components/institutionComponent/homePageInstitution';
import HomePageUser from '@/components/userComponent/homePageUser';
import { CircularProgress } from '@mui/material';
import jwt, { JwtPayload } from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';

interface MyTokenPayload extends JwtPayload {
  roleId: number;
  id: string;
}

const Home: React.FC = () => {
  const [accessDenied, setAccessDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roleId, setRoleId] = useState<number | null>(null);


  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
        try {
                const decodedToken = jwt.decode(accessToken) as MyTokenPayload;
                
                setRoleId(decodedToken?.roleId || null);
                if (decodedToken?.roleId === 1) {
                    setLoading(false);
                } else if (decodedToken?.roleId === 2) {
                    setLoading(false);
                } else {
                    console.log("ELSE")
                    setLoading(false);
                    setAccessDenied(true);
                }
            } catch (error) {
                console.log("ERROR")
                setLoading(false);
                setAccessDenied(true);
            }
        } else {
            console.log("else")
            setLoading(false);
            setAccessDenied(true);
        }
  }, []);


  return (
    <div>
          {roleId  == 1 &&  <HomePageUser />}
          {roleId  == 4 &&  <HomePageInstitution />}

    </div>
  );
};

export default Home;
