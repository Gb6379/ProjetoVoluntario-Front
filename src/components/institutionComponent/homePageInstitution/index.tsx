import Sidebar from '@/components/sidebar/sidebar';
import { listDataVoluntarioInfo } from '@/models/voluntario';
import { useAuth } from '@/modules/AuthContext';
import { listVolData } from '@/services/listVolData';
import { listInstData } from '@/services/listInstData';
import { listDataInstitutionInfo } from '@/models/institution';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useEffect, useState } from 'react';

interface MyTokenPayload extends JwtPayload {
    roleId: number;
    id: string;
}

const HomePageInstitution = () => {
    const [accessDenied, setAccessDenied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [roleId, setRoleId] = useState<number | null>(null);
    const { getToken } = useAuth();
    const { isAuthenticated } = useAuth();
    const [infoInsti, setInfoInsti] = useState<listDataInstitutionInfo | null>(null);
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
        const fetchInstitutionInfo = async () => {
            try {
                const access_token = sessionStorage.getItem('access_token');
                if (access_token) {
                    const decodedToken = jwt.decode(access_token) as MyTokenPayload;
                    const id = decodedToken.id;
                    const institutionData = await listInstData(id, access_token);
                    setInfoInsti(institutionData);
                }
            } catch (error) {
                // Trate o erro caso a requisição falhe.
                console.error("Erro ao obter informações do usuário:", error);
            }
        };

        fetchInstitutionInfo();
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
                                <Typography variant="h6" color="textPrimary">Seja bem vindo: {infoInsti?.name}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{ p: 4, height: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Button size="large" variant="contained" color="secondary" href="/instituicoes" sx={{ backgroundColor: '#23004C' }}>Ver Instituições</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{ p: 4, height: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Button size="large" variant="contained" color="secondary" href="/voluntarios" sx={{ backgroundColor: '#23004C' }}>Ver Voluntarios</Button>
                            </Box>
                        </Grid>
                    </Grid>
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
export default HomePageInstitution;