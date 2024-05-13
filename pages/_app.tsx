import { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '../src/modules/AuthContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default MyApp;
