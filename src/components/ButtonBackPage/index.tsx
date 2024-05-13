import { Button, Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { purple } from '@mui/material/colors';

const handleReturnPage = () => {
    history.back();
};



const ButtonPackPage = () => {

    return (
        <>
            <Box>
            {/* <ThemeProvider theme={theme}> */}
                <Button variant="contained" color="secondary"
                    sx={{
                        width: 100,
                        fontSize: 14,
                        whiteSpace: 'nowrap',
                        margin: '0px auto auto 25px',
                        padding: '10px 20px',
                        fontFamily: 'Arial',
                        backgroundColor: '#23004C'
                    }}

                    onClick={handleReturnPage}
                    
                    >
                    Voltar
                </Button>
            {/* </ThemeProvider> */}
            </Box>
        </>
    );
}

export default ButtonPackPage;