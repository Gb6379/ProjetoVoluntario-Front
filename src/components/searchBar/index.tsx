import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { listInstDataByName } from '@/services/searchBar';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useState } from 'react';


interface MyTokenPayload extends JwtPayload {
  roleId: number;
  id: string;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = async () => {
    try {
      const access_token = sessionStorage.getItem('access_token');
      if (access_token) {
        const decodedToken = jwt.decode(access_token) as MyTokenPayload;
        const searchData = await listInstDataByName(searchTerm, access_token);
        console.log(searchData);
      }
    // Handle the search data, e.g., update state or perform other actions
  
    } catch (error) {
      console.error("Erro ao obter informações do voluntario:", error);
    }
   
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
       <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        //onBlur={handleSearch} // You can also trigger search on blur if needed
                        onClick={handleSearch}

                        />
                </Search>
    </Box>
  );
}