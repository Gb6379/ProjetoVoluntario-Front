import allCities from '@/models/allCities';
import { useAuth } from '@/modules/AuthContext';
import { createInstitution } from '@/services/createInstitution';
import { listAllCities } from '@/services/listAllCities';
import {
    Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';


const NewAccountInstitution = () => {

    const { getToken } = useAuth();
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [info, setInfo] = useState('');
    const [phone, setPhone] = useState('');
    const [tipo, setTipo] = useState('');
    const [hours, setHours] = useState('');
    const [voluntarioStatus, setvoluntarioStatus] = useState('');
    const [doacoeStatus, setdoacoeStatus] = useState('');
    const [itensNecessarios, setitensNecessarios] = useState('');
    const [servicosNecessarios, setservicosNecessarios] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [showNotificationError, setShowNotificationError] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [name, setName] = useState('');
    const [selectedState, setSelectedState] = useState<allCities | null>(null);
    const [getAllCities, setGetAllCities] = useState<allCities[]>([]);
    const [registration, setRegistration] = useState('');
    const [token, setToken] = useState('');


    useEffect(() => {
        //getCities();
    }, []);

    useEffect(() => {
        const fetchToken = async () => {
            const authToken = await getToken();
            setToken(authToken);
        };
        fetchToken();
    }, [getToken]);

    const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredCep = event.target.value;
        setCep(enteredCep);
        if (enteredCep.length === 8) { // Assuming CEPs have 8 characters
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${enteredCep}/json/`);
                const { logradouro, bairro, localidade, uf } = response.data;
                setRua(logradouro);
                setBairro(bairro);
                setCidade(localidade);
                //setEstado(uf);
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        }
    }

    const getCities = async () => {
        try {
            const token = await getToken();
            const response = await listAllCities(token);
            const sortedCities = response.map((state: { cities: any[]; }) => ({
                ...state,
                cities: state.cities.sort((a, b) => a.name.localeCompare(b.name))
            }));
            const sortedStates = sortedCities.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
            setGetAllCities(sortedStates);
        } catch (error) {
            showSnackbarError('Erro ao trazer os dados, atualize sua pagina!');
        }
    };

    const signUp = useCallback(() => {
        /*if (!email.endsWith('@sanofi.com')) {
            showSnackbarError('Email inválido, utilize um email da Sanofi')
            return;
        }*/
        createInstitution(
            {
                name: name,
                email: email,
                cnpj: cnpj,
                phone: phone,
                tipo: tipo,
                info: info,
                hours: hours,
                voluntarioStatus:voluntarioStatus,
                doacoeStatus: doacoeStatus,
                itensNecessarios: itensNecessarios,
                servicosNecessarios: servicosNecessarios,
                cep: cep,
                rua: rua,
                bairro: bairro,
                numero: numero,
                cidade: cidade,
            },

        )
            .then(() => {
                showSnackbarSuccess('Cadastro realizado com sucesso');
            })
            .catch((error) => {
                const errorMessage = error?.response?.data?.reason;
                if (typeof errorMessage === 'string') {
                    if (errorMessage.includes('user.IDX_e12875dfb3b1d92d7d7c5377e2')) {
                        showSnackbarError('E-mail já cadastrado');
                    } else if (errorMessage.includes('email must be an email')) {
                        showSnackbarError('E-mail inválido, valide o email');
                    } else if (errorMessage.includes('user.IDX_d07ffb0ae23b857d82ceb6a76f')) {
                        showSnackbarError('Já existe um usuário com esse número de matrícula');
                    } else {
                        showSnackbarSuccess('Cadastro realizado com sucesso');
                    }
                } else {
                    showSnackbarError('Erro desconhecido');
                }
            });
    }, [email, name, cnpj, phone,tipo ,info, hours,voluntarioStatus, doacoeStatus, itensNecessarios, servicosNecessarios, cep, rua, bairro, numero, cidade, registration]);

    const showSnackbarError = (message: string) => {
        setNotificationMessage(message);
        setShowNotificationError(true);
    };

    const showSnackbarSuccess = (message: string) => {
        setNotificationMessage(message);
        setShowNotification(true);
    };

    const handleStateChange = (event: SelectChangeEvent<string>) => {
        const selectedState = event.target.value;
        const state = getAllCities.find((state) => state.uf === selectedState);
        setSelectedState(state || null);
        setCidade('');
    };

    const handleReturnPage = () => {
        history.back();
    };

    return (
        <>

            <Container sx={{  display: 'flex', 
                                flexDirection: 'column', 
                                width: '480px', 
                                maxHeight: '80vh', // Set maxHeight to 80% of viewport height
                                overflowY: 'auto', // Add vertical scrolling
                                mt: '0%' }}>
                <Typography variant="h4" gutterBottom>Cadastro de Intituticao</Typography>
                <TextField value={name} onChange={(e) => setName(e.target.value)} label="Nome" sx={{ mt: '15px' }} />
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" type="email" sx={{ mt: '15px' }} />
                <TextField value={cnpj} onChange={(e) => setCnpj(e.target.value)} label="Cnpj" type="cnpj" sx={{ mt: '15px' }} />
                <TextField value={phone} onChange={(e) => setPhone(e.target.value)} label="phone" type="phone" sx={{ mt: '15px' }} />
                <FormControl sx={{ mt: '15px' }}>
                <InputLabel>Tipo</InputLabel>
                <Select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                >
                    <MenuItem value="ponto de coleta">Ponto de Coleta</MenuItem>
                    <MenuItem value="abrigo">Abrigo</MenuItem>
                    {/* Add more options as needed */}
                </Select>
                </FormControl>
                <TextField value={info} onChange={(e) => setInfo(e.target.value)} label="Info" type="info" sx={{ mt: '15px' }} />
                {/* Dropdown for donationStatus */}
                <FormControl sx={{ mt: '15px' }}>
                <InputLabel>Status Doações</InputLabel>
                <Select
                    value={doacoeStatus}
                    onChange={(e) => setdoacoeStatus(e.target.value)}
                >   
                   <MenuItem value="urgente">Urgente</MenuItem>
                    <MenuItem value="precisa">Precisa</MenuItem>
                    <MenuItem value="nao precisa">Não precisa</MenuItem>
                    {/* Add more options as needed */}
                </Select>
                </FormControl>
                {/* Dropdown for voluntariesStatus */}
                <FormControl sx={{ mt: '15px' }}>
                <InputLabel>Status Voluntarios</InputLabel>
                <Select
                    value={voluntarioStatus}
                    onChange={(e) => setvoluntarioStatus(e.target.value)}
                    >
                     <MenuItem value="urgente">Urgente</MenuItem>
                    <MenuItem value="precisa">Precisa</MenuItem>
                    <MenuItem value="nao precisa">Não precisa</MenuItem>
                    {/* Add more options as needed */}
                </Select>
                </FormControl>
                <TextField value={hours} onChange={(e) => setHours(e.target.value)} label="Horario Funcionamento" type="hours" sx={{ mt: '15px' }} />
                <TextField value={itensNecessarios} onChange={(e) => setitensNecessarios(e.target.value)} label="Itens necessarios" type="itens" sx={{ mt: '15px' }} />
                <TextField value={servicosNecessarios} onChange={(e) => setservicosNecessarios(e.target.value)} label="Servicos necessarios" type="servicos" sx={{ mt: '15px' }} />
                <TextField value={cep} onChange={handleCepChange} label="Cep" type="cep" sx={{ mt: '15px' }} />
                <TextField value={rua} onChange={(e) => setRua(e.target.value)} label="Rua" type="rua" sx={{ mt: '15px' }} />
                <TextField value={bairro} onChange={(e) => setBairro(e.target.value)} label="Bairro" type="bairro" sx={{ mt: '15px' }} />
                <TextField value={numero} onChange={(e) => setNumero(e.target.value)} label="Numero" type="numero" sx={{ mt: '15px' }} />
                <TextField value={cidade} onChange={(e) => setCidade(e.target.value)} label="Cidade" type="cidade" sx={{ mt: '15px' }} />
                {/*<FormControl sx={{ mt: '15px' }}>
                    <InputLabel>Estado</InputLabel>
                    <Select value={selectedState?.uf || ''} onChange={handleStateChange}>
                        {getAllCities.map((state) => (
                            <MenuItem key={state.id} value={state.uf}>
                                {state.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedState && (
                    <FormControl sx={{ mt: '15px' }}>
                        <InputLabel>Cidade</InputLabel>
                        <Select value={cidade || ''} onChange={(e) => setCidade(e.target.value as string)}>
                            {selectedState.cities.map((cidade) => (
                                <MenuItem key={cidade.id} value={cidade.id}>
                                    {cidade.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}*/}
                {/*<TextField value={registration} onChange={(e) => setRegistration(e.target.value)} label="Matrícula" type="number" sx={{ mt: '15px' }} />*/}
                {/* <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Senha" type="password" sx={{ mt: '15px' }} /> */}
                <Button variant="contained" color="secondary" sx={{ mt: '15px', backgroundColor: '#23004C' }} onClick={() => signUp()}> Enviar </Button>

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

export default NewAccountInstitution