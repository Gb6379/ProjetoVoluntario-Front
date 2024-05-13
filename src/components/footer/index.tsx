import { Box, Link, Typography } from '@mui/material';
const Footer = () => {

  return (
    <Box
      component="footer"
      sx={{py: 1, position: 'fixed',  bottom: '0px',  width: '100%', display: 'flex', justifyContent: 'start', backgroundColor:'#FFFFFF' }}>
      <Typography variant="body2">
        <Link href="" color="primary" sx={{ mx: 2, textDecoration: 'none' }}>Fale Conosco</Link>
        |
        <Link href="" color="primary" sx={{ mx: 2, textDecoration: 'none' }}> Política de Privacidade</Link>
        |
        <Link href="" color="primary" sx={{ mx: 2, textDecoration: 'none' }}>Política de Cookies </Link>
      </Typography>
      <Typography variant="body2" sx={{ mr: 1, ml: '310px' }}>© {new Date().getFullYear()}   Todos os direitos reservados.</Typography>
    </Box>
  );
};

export default Footer;
