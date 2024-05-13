import Sidebar from '@/components/sidebar/sidebar';
import { listDataVoluntarioInfo } from '@/models/voluntario';
import { useAuth } from '@/modules/AuthContext';
import { listVolData } from '@/services/listVolData';
import { listInstData } from '@/services/listInstData';
import { listDataInstitutionInfo } from '@/models/institution';
import { Box, Button, Grid, InputBase, Paper, Typography, alpha, styled } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import jwt, { JwtPayload } from 'jsonwebtoken';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import SearchAppBar from '@/components/searchBar';

interface MyTokenPayload extends JwtPayload {
    roleId: number;
    id: string;
}

const HomePageUser = () => {
    const [accessDenied, setAccessDenied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [roleId, setRoleId] = useState<number | null>(null);
    const { getToken } = useAuth();
    const { isAuthenticated } = useAuth();
    const [infoVol, setInfoVol] = useState<listDataVoluntarioInfo | null>(null);
    const [showNotificationError, setShowNotificationError] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        

    }, []);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        console.log(accessToken)
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
                setLoading(false);
                setAccessDenied(true);
            }
        } else {
            console.log("else")
            setLoading(false);
            setAccessDenied(true);
        }
    }, []);

    useEffect(() => {
        const fetchVolInfo = async () => {
            try {
                const access_token = sessionStorage.getItem('access_token');
                if (access_token) {
                    const decodedToken = jwt.decode(access_token) as MyTokenPayload;
                    const id = decodedToken.id;
                    const userData = await listVolData(id, access_token);
                    setInfoVol(userData);
                }
            } catch (error) {
                // Trate o erro caso a requisição falhe.
                console.error("Erro ao obter informações do usuário:", error);
            }
        };

        fetchVolInfo();
    }, []);

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
            <Sidebar>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Box
                                sx={{ p: 2, height: 120, width: '570px', marginTop: '40px', marginLeft: '25.5%', borderRadius: '15px', border: 2, borderColor: '#9E4DFE', }}>
                                <Typography variant="h6" color="textPrimary">Seja bem vindo, Voluntario: {infoVol?.name}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{ p: 4, height: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Button size="large" variant="contained" color="secondary" href="/pontoscoleta" sx={{ backgroundColor: '#FF4500' }}>Pontos de coleta</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{ p: 4, height: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Button size="large" variant="contained" color="secondary" href="/abrigos" sx={{ backgroundColor: '#FF4500' }}>Abrigos</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <iframe src="https://www.google.com/maps/d/embed?mid=1ZlKA__gK8tH-WY6mbDeQzltsiwao7Q8&hl=pt-BR&ehbc=2E312F" width="640" height="480"></iframe>
                    </div>
                </Container>
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
             </Sidebar>
        </>
    )
}
export default HomePageUser;