import { useAuth } from "@/modules/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Backdrop, Box, Button, Container, Fade, Modal, TextField, Typography } from "@mui/material";
import jwt, { JwtPayload } from 'jsonwebtoken';
import React, { useEffect, useState } from "react";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { listVolData } from "@/services/listVolData";
import { listDataVoluntarioInfo } from "@/models/voluntario";

interface MyTokenPayload extends JwtPayload {
  id: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ConfigSidebar: React.FC = () => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();
  const [token, setToken] = useState('');
  const [infoVol, setInfoVol] = useState<listDataVoluntarioInfo | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showNotificationError, setShowNotificationError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const access_token = sessionStorage.getItem('access_token');
        if (access_token) {
          const decodedToken = jwt.decode(access_token) as MyTokenPayload;
          const id = decodedToken.id;
          const volDat = await listVolData(id, access_token);
          setInfoVol(volDat);
          
        }

      } catch (error) {
        showSnackbarError('Erro ao buscar os dados do usuário, atualize a pagina!');
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const authToken = await getToken();
      setToken(authToken);
    };

    fetchToken();
  }, [getToken]);

  const handleReturnPage = () => {
    window.history.back();
  };

  const showSnackbarError = (message: string) => {
    setNotificationMessage(message);
    setShowNotificationError(true);
  };

  const showSnackbarSuccess = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  return (
    <>

      <Container
        sx={{
          display: "grid",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="div" sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center", mt: "15px" }}>Informações do Voluntario</Typography>
        <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center", mt: "60px" }}>
          <AccountCircleIcon sx={{ mr: "15px" }} />
          <TextField
            id="filled-read-only-input"
            label="Nome"
            value={infoVol?.name || ''}
            InputProps={{ readOnly: true }}
            variant="filled"
          />
        </Box>
        <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center", mt: "15px" }}>
          <AccountCircleIcon sx={{ mr: "15px" }} />
          <TextField id="filled-read-only-input" label="Email" value={infoVol?.email || ''} InputProps={{ readOnly: true }} variant="filled" />
        </Box>
        <Box sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          mt: "15px",
        }}>
          <AccountCircleIcon sx={{ mr: "15px" }} />
          <TextField id="filled-read-only-input" label="Estado" value={infoVol?.cpf || ''} InputProps={{ readOnly: true }} variant="filled" />
        </Box>
        <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center", mt: "15px" }}>
          <AccountCircleIcon sx={{ mr: "15px" }} />
          <TextField id="filled-read-only-input" label="Cidade" value={infoVol?.phone || ''} InputProps={{ readOnly: true }} variant="filled" />
        </Box>
        <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center", mt: "15px" }}>
          <Button variant="contained" color="secondary" size="medium" type="button" sx={{ backgroundColor: '#23004C' }} onClick={handleOpen}>Redefinir senha</Button>
        </Box>
        <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center", mt: "15px" }}>
          <Button variant="contained" color="secondary" size="medium" type="button" sx={{ width: '165px', backgroundColor: '#23004C' }} onClick={handleReturnPage}>Voltar</Button>
        </Box>
      </Container>

      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: 'grid', justifyContent: 'center', mt: '25px' }}>

              <Button variant="contained" color="secondary" size="medium" type="button" sx={{ width: '200px', mt: '15px', backgroundColor: '#23004C' }} onClick={handleClose}>Voltar</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Snackbar open={showNotificationError} autoHideDuration={3000} onClose={() => setShowNotificationError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={{ top: '30px' }}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotificationError(false)} severity="error">
          {notificationMessage}
        </MuiAlert>
      </Snackbar>
      <Snackbar open={showNotification} autoHideDuration={3000} onClose={() => setShowNotification(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={{ top: '30px' }}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotification(false)} severity="success">
          {notificationMessage}
        </MuiAlert>
      </Snackbar>

    </>
  );
};

export default ConfigSidebar;