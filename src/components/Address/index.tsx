import allCities from '@/models/allCities';
import { useAuth } from '@/modules/AuthContext';
import { createVoluntario } from '@/services/createVoluntario';
import { listAllCities } from '@/services/listAllCities';
import {
    Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { listDataAddressioInfo } from '@/models/address';
import { listAddressData } from '@/services/listAddress';


interface MyTokenPayload extends JwtPayload {
    id: string;
  }


const Address = () => {

    const { getToken } = useAuth();
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [showNotificationError, setShowNotificationError] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [selectedState, setSelectedState] = useState<allCities | null>(null);
    const [getAllCities, setGetAllCities] = useState<allCities[]>([]);
    const [token, setToken] = useState('');
    const [infoAddress, setAddressData] = useState<listDataAddressioInfo | null>(null);


    useEffect(() => {
        const fetchAddressInfo = async () => {
          try {
            const access_token = sessionStorage.getItem('access_token');
            if (access_token) {
              const decodedToken = jwt.decode(access_token) as MyTokenPayload;
              const id = decodedToken.id;
              const data = await listAddressData(id, access_token);
              console.log(data)
              setAddressData(data);
             
            }
    
          } catch (error) {
            showSnackbarError('Erro ao buscar os dados do endereco, atualize a pagina!');
          }
        };
        fetchAddressInfo();
      }, []);

    useEffect(() => {
        const fetchToken = async () => {
            const authToken = await getToken();
            setToken(authToken);
        };
        fetchToken();
    }, [getToken]);



    const showSnackbarError = (message: string) => {
        setNotificationMessage(message);
        setShowNotificationError(true);
    };

    const showSnackbarSuccess = (message: string) => {
        setNotificationMessage(message);
        setShowNotification(true);
    };


    const handleReturnPage = () => {
        history.back();
    };

    return (
        <>

            <Container sx={{ display: 'flex', flexDirection: 'column', width: '480px', mt: '6%' }}>
                <Typography variant="h3" gutterBottom>Endereço</Typography>
                <TextField value={infoAddress?.rua || ''}  label="Rua" type="rua" sx={{ mt: '15px' }} InputProps={{ readOnly: true }} variant="filled" />
                <TextField value={infoAddress?.bairro}  label="Bairro" type="bairro" sx={{ mt: '15px' }} />
                <TextField value={infoAddress?.numero}  label="Numero" type="numero" sx={{ mt: '15px' }} />
                <TextField value={infoAddress?.cidade}  label="Cidade" type="cidade" sx={{ mt: '15px' }} />
            </Container>

            <Snackbar open={showNotificationError} autoHideDuration={3000} onClose={() => setShowNotificationError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={{ top: '30px' }}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotificationError(false)} severity="error">
                    {notificationMessage}
                </MuiAlert>
            </Snackbar>
            <Snackbar open={showNotification} autoHideDuration={3000} onClose={() => setShowNotification(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={{ top: '30px' }} >
                <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotification(false)} severity="success">
                    {notificationMessage}
                </MuiAlert>
            </Snackbar>
        </>
    )
}

export default Address