
import { api } from '@/services/axios';
import { Backdrop, Box, Button, Container, Fade, Modal, TextField, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';
import { AuthModule, useAuth } from '../src/modules/AuthContext';
import NewAccount from '@/components/NewAccount';
import NewAccountInstitution from '@/components/NewInstitution';
import ToggleButton from '@/components/toggleButton';

const style = { position: 'absolute' as 'absolute', top: '50%', left: '50%',  transform: 'translate(-50%, -50%)', width: 700, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 };


const LoginPage: React.FC = () => {
  const [openNewAccount, setOpenNewAccount] = React.useState(false);
  const [openNewAccountInstitution, setOpenNewAccountInstitution] = React.useState(false);
  const handleOpenNewAccountInstitution = () => setOpenNewAccountInstitution(true);
  const handleCloseNewAccountInstituion = () => setOpenNewAccountInstitution(false);
  const [openForgetPassword, setOpenForgetPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [showNotificationError, setShowNotificationError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const handleOpenNewAccount = () => setOpenNewAccount(true);
  const handleCloseNewAccount = () => setOpenNewAccount(false);
  const handleOpenForgetPassword = () => setOpenForgetPassword(true);
  const handleCloseForgetPassword = () => setOpenForgetPassword(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [emailSupport, setEmailSupport] = useState('');
  const [subjectSupport, setSubjectSupport] = useState('');
  const [messageSupport, setMessageSupport] = useState('');


  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('auth/login', {
        email,
        password,
      });

      const { access_token } = response.data;
      login(access_token);
      sessionStorage.setItem('access_token', response.data.access_token);
      showSnackbarSuccess('Login realizado com sucesso');
      setTimeout(() => {
        window.location.href = '/home';
      }, 2000);

    } catch (error) {
      console.error('Failed to login:', error);
      showSnackbarError('Usuário ou senha inválidos');
    }
  };


  const showSnackbarError = (message: string) => {
    setNotificationMessage(message);
    setShowNotificationError(true);
  };

  const showSnackbarSuccess = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      signIn(e);
    }
  };


  return (
    <>
      <div>
        <Head>
          <title>Solidarize</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Container sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Container sx={{ width: '590px', padding: '60px 55px 33px 55px', border: 3, borderRadius: '5px', display: 'grid' }}>
            <img src="1.png" alt="logo" style={{ width: '70%', marginBottom: '0px', marginLeft: '70px'  }} />
            <Typography sx={{ mt: '30px', mb: '25px', textAlign: 'center' }} variant="h6">Solidarize</Typography>
            <Button variant="contained" color="secondary" sx={{ mb: '25px', backgroundColor: '#6B8E23' }} size="medium" onClick={handleOpenNewAccount} type='button'>Voluntario? cadastre-se</Button>
            <Button variant="contained" color="secondary" sx={{ mb: '25px', backgroundColor: '#008B8B' }} size="medium" onClick={handleOpenNewAccountInstitution} type='button'>Instituicao? cadastre-se</Button>
            <ToggleButton>
              <Typography sx={{ textAlign: "center", mt: "10px", mb: "10px", alignItems: "center" }} variant="body1" color="#6B8E23">Insira o seu usuário e senha</Typography>
              <TextField value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: '15px' }} fullWidth id="outlined-basic" label="Insira o seu e-mail" variant="outlined" />
              <TextField value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} fullWidth id="outlined-basic" label="Insira sua senha" type="password" variant="outlined" />
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: '15px', mb: '15px', backgroundColor: '#FF4500' }} onClick={signIn} >Acessar</Button>
              <Button variant="contained" color="secondary" fullWidth sx={{ backgroundColor: '#FF4500' }} onClick={handleOpenForgetPassword} >Redefinir Senha</Button>
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: '15px', mb: '15px', backgroundColor: '#FF4500' }} onClick={handleOpenModal} >Dúvidas/Dificuldades, entre em contato com o suporte.</Button>
            </ToggleButton>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <>
                  <Button onClick={handleCloseModal} variant="contained" color="secondary" fullWidth sx={{ marginRight: '10px', width: '40%', mt: '1px', mb: '1px', backgroundColor: '#23004C' }}>
                    Voltar
                  </Button>
              </>

            </Modal>
          </Container>
        </Container>
      </div>
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={openNewAccount} onClose={handleCloseNewAccount} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, }, }}>
        <Fade in={openNewAccount}>
          <Box sx={style}>
            <NewAccount />
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '480px' }}>
              <Button variant="contained" color="secondary" sx={{ t: '15px', backgroundColor: '#23004C', ml: '100px', width: '430px', mt: '15px' }} onClick={handleCloseNewAccount}> Voltar </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={openNewAccountInstitution} onClose={handleCloseNewAccountInstituion} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, }, }}>
        <Fade in={openNewAccountInstitution}>
          <Box sx={style}>
            <NewAccountInstitution />
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '480px' }}>
              <Button variant="contained" color="secondary" sx={{ t: '15px', backgroundColor: '#23004C', ml: '100px', width: '430px', mt: '15px' }} onClick={handleCloseNewAccountInstituion}> Voltar </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
 {/* 
    do a insitution modal here for register
  */}

      <Snackbar open={showNotificationError} autoHideDuration={3000} onClose={() => setShowNotificationError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={{ top: '30px' }}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotificationError(false)} severity="error">
          {notificationMessage}
        </MuiAlert>
      </Snackbar>
      <Snackbar open={showNotification} autoHideDuration={3000} onClose={() => setShowNotification(false)} anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
        style={{ top: '30px' }}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotification(false)} severity="success">
          {notificationMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
