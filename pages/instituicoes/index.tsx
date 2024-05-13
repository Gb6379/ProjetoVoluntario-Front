import { useAuth } from "@/modules/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Backdrop, Box, Button, Container, Divider, Fade, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import jwt, { JwtPayload } from 'jsonwebtoken';
import React, { useEffect, useState } from "react";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { listDataInstitutionInfo } from "@/models/institution";
import { listInstData } from "@/services/listInstData";
import { info } from "console";
import { listAllInstData } from "@/services/listAllInstitutions";
import ButtonBackPage from "@/components/ButtonBackPage";
import Address from "@/components/Address";
import Sidebar from "@/components/sidebar/sidebar";
import SearchAppBar from "@/components/searchBar";
import { listInstDataByName } from "@/services/searchBar";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Search from "@mui/icons-material/Search";

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

const Intituicoes: React.FC = () => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();
  const [token, setToken] = useState('');
  const [infoInstitution, setInfoInstitution] = useState<listDataInstitutionInfo | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showNotificationError, setShowNotificationError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [openAddress, setOpenAddress] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const [selectedInstitution, setSelectedInstitution] = useState<any>(null);
  const handleOpenAddress = (institution: any) => {
    console.log("HANDLE", institution.enderecos)
    setSelectedInstitution(institution);
    setOpenAddress(true);
  };

  const handleClosAddress = () => setOpenAddress(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const access_token = sessionStorage.getItem('access_token');
        if (access_token) {
          const instiData = await listAllInstData(access_token);//here is listAllInstitutions -> listAllInstData
          console.log("DADOS INSTITUICAO",instiData)
          setInstitutions(instiData);
        }

      } catch (error) {
        showSnackbarError('Erro ao buscar os dados do instituicoes, atualize a pagina!');
      }
    };
    fetchUserInfo();
  }, []);

  const handleSearch = async () => {
    try {
      const access_token = sessionStorage.getItem('access_token');
      if (access_token) {
        const decodedToken = jwt.decode(access_token) as MyTokenPayload;
        const searchData = await listInstDataByName(searchTerm, access_token);
        console.log("SEARCH DATA", searchData)
        setInstitutions(searchData)
      }
    // Handle the search data, e.g., update state or perform other actions
  
    } catch (error) {
      console.error("Erro ao obter informações do voluntario:", error);
    }
   
  };

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
  //here below, check out appointmentList page e do something like that
  return (
    <>
          <Sidebar>
        <Box sx={{ p: 3 }}>
      
                    <TextField sx={{ mt: '10px', mr: '5px' }} label="Buscar nome" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant='contained' color='secondary' sx={{ backgroundColor: '#23004C', mt: '10px', mr: '5px', height: '55px' }} onClick={handleSearch}>Buscar</Button>
        

                <Table>
                    <TableHead>
                   
                   
                    <Typography sx={{ mt: '30px', mb: '25px', textAlign: 'center' }} variant="h6">Todas Instituições</Typography>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>itens Necessarios</TableCell>
                            <TableCell>voluntarios Status</TableCell>
                            <TableCell>Doacoes Status</TableCell>
                            <TableCell>Servicos necessarios</TableCell>
                            <TableCell>Endereço</TableCell> {/* New cell for address */}                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {institutions.map((inst: any, index: number) => (
                            <TableRow key={(inst.id)} style={{ backgroundColor: index % 2 === 0 ? '#F0F0F0' : '#FFFFFF', }}>
                                <TableCell>{inst.name}</TableCell>
                                <TableCell>{inst.tipo}</TableCell>
                                <TableCell>{inst.email}</TableCell>
                                <TableCell>{inst.phone}</TableCell>
                                <TableCell>{inst.itensNecessarios}</TableCell>
                                <TableCell>{inst.voluntarioStatus}</TableCell>
                                <TableCell>{inst.doacoeStatus}</TableCell>
                                <TableCell>{inst.servicosNecessarios}</TableCell>
                                <TableCell>
                                {/* Make the address clickable */}
                                <Button variant="contained" color="secondary" sx={{ mb: '25px', backgroundColor: '#6B8E23' }} size="medium" onClick={() => handleOpenAddress(inst)}>
                                Endereço
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box>
                <ButtonBackPage />
            </Box>
       
            <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={openAddress} onClose={handleClosAddress} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, }, }}>
      <Fade in={openAddress}>
        <Box sx={style}>
          <Container sx={{ display: 'flex', flexDirection: 'column', width: '480px', mt: '6%' }}>
            <Typography variant="h6" gutterBottom>Endereços </Typography>
            {/* Display list of addresses */}
            {selectedInstitution?.enderecos.map((endereco: any, index: number) => (
              <div key={index}>
                <TextField value={endereco.rua || ''} label="Rua" type="rua" sx={{ mt: '15px',  width: '430px' }} InputProps={{ readOnly: true }} variant="filled" />
                <TextField value={endereco.bairro} label="Bairro" type="bairro" sx={{ mt: '15px',  width: '430px' }} InputProps={{ readOnly: true }} variant="filled" />
                <TextField value={endereco.numero} label="Numero" type="numero" sx={{ mt: '15px' ,  width: '430px'}} InputProps={{ readOnly: true }} variant="filled" />
                <TextField value={endereco.cidade} label="Cidade" type="cidade" sx={{ mt: '15px',  width: '430px' }} InputProps={{ readOnly: true }} variant="filled" />
                <Divider sx={{ mt: '20px', mb: '20px' }} />
              </div>
            ))}
          </Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '480px' }}>
            <Button variant="contained" color="secondary" sx={{ t: '15px', backgroundColor: '#23004C', ml: '100px', width: '430px', mt: '15px' }} onClick={handleClosAddress}> Voltar </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
        
            <Snackbar open={showNotificationError} autoHideDuration={3000} onClose={() => setShowNotificationError(false)} anchorOrigin={{vertical: 'top', horizontal: 'center'}} style={{ top: '30px' }}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotificationError(false)} severity="error">
                    {notificationMessage}
                </MuiAlert>
            </Snackbar>
            </Sidebar>
        </>

  );
};

export default Intituicoes;