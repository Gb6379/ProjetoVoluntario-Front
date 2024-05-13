import { useAuth } from "@/modules/AuthContext";
import { Button, Container, Typography } from "@mui/material";

const AccessDenied: React.FC = () => {

    const { isAuthenticated } = useAuth();
    const redirectHome = () => {
        window.location.href = '/'
    }
    return (
        <div>
            <Container sx={{ width: '100%', minHeight: '100vh', display: "flex", alignItems: 'center', justifyContent: 'center', mt: '5px' }}>
                <Container sx={{ width: '590px', padding: '60px 55px 33px 55px', display: 'grid', mt: '5px'}}>
                    <Container sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/logo-sanofi.png" alt="logo" style={{ width: '50%', marginBottom: '30px', alignItems: 'center', display: "flex", justifyContent: 'center' }} />
                    </Container>
                    <Typography sx={{ mt: '30px', mb: '25px', textAlign: 'center' }} variant="h6"><b>Acesso negado! Clique no botão abaixo e faça login novamente.</b></Typography>
                    <Container sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <Button variant="contained" color="secondary" fullWidth sx={{ backgroundColor: '#23004C', mt: '15px', mb: '10px', width: '100px' }} onClick={() => redirectHome()} >Acessar</Button>
                    </Container>
                </Container>
            </Container>
        </div>
    );

}




export default AccessDenied;