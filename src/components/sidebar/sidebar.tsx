import React, { FC, useEffect, useState } from 'react';
import { SidebarWrapper } from './sidebar.styled';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Badge, Button, CircularProgress, Container, Icon, Modal } from '@mui/material';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import NightShelterRoundedIcon from '@mui/icons-material/NightShelterRounded';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth, AuthModule } from '@/modules/AuthContext';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import AccessDenied from '../accessDenied';
import { listVoluntarioData } from '@/services/listVoluntarioData';
import { listDataVoluntarioInfo } from '@/models/voluntario';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Footer from '../footer';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Avatar } from '@material-ui/core';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


interface MyTokenPayload extends JwtPayload {
   roleId: number;
 }

 export default function Sidebar(props: { children?: JSX.Element | JSX.Element[] }) {
   const { isAuthenticated } = useAuth();
   const [accessDenied, setAccessDenied] = useState(false);
   const [loading, setLoading] = useState(false);
   const [loading2, setLoading2] = useState(true);
   const [roleId, setRoleId] = useState<number | null>(null);
   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
   const [infoUser, setInfoUser] = useState<listDataVoluntarioInfo | null>(null);
   const [infoNotification, setInfoNotification] = useState<any>(null);
   const [openModal, setOpenModal] = React.useState(false);
   const handleOpenModal = () => setOpenModal(true);
   const handleCloseModal = () => setOpenModal(false);
   useEffect(() => {
     const accessToken = sessionStorage.getItem('access_token');
     if (accessToken) {
       try {
         const decodedToken = jwt.decode(accessToken) as MyTokenPayload;
         setRoleId(decodedToken?.roleId || null);
         if (decodedToken?.roleId === 1) {
          console.log("first if")
           setLoading(false);
         } else if (decodedToken?.roleId === 2) {
           setLoading(false);
         } else {
           setLoading(false);
           setAccessDenied(true);
         }
       } catch (error) {
         console.log("else")
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
     const fetchUserInfo = async () => {
       try {
         const access_token = sessionStorage.getItem('access_token');
         if (access_token) {
          console.log("IFO SIDE BAR USER EFFECT")
           const decodedToken = jwt.decode(access_token) as MyTokenPayload;
           const id = decodedToken.id;
           const userData = await listVoluntarioData(id, access_token);
           setInfoUser(userData);
         }
 
 
       } catch (error) {
 
         console.error("Erro ao obter informações do usuário:", error);
       }
     };
 
     fetchUserInfo();
     setLoading2(false)
   }, []);
 
   /*useEffect(() => {
     const getNotification = async () => {
       try {
         const access_token = sessionStorage.getItem('access_token');
         if (access_token) {
           const decodedToken = jwt.decode(access_token) as MyTokenPayload;
           const id = decodedToken.id;
           const userData = await getNotificationsAll(access_token);
           setInfoNotification(userData);
           if (userData?.photo?.content) {
             const blob = new Blob([Buffer.from(userData.photo.content)], {
               type: userData.photo.type,
             });
             const url = URL.createObjectURL(blob);
 
           }
         }
 
       } catch (error) {
 
       }
     };
     getNotification();
   }, []);*/
 
   const theme = useTheme();
   const [open, setOpen] = React.useState(false);
 
   const handleDrawerOpen = () => {
     setOpen(true);
   };
 
   const handleDrawerClose = () => {
     setOpen(false);
   };
 
   const logout = () => {
     const module = new AuthModule()
     module.logout()
     window.location.href = '/'
   };
 
 
 
   return (
     <div>

  {roleId === 1 ? (
      <Box sx={{ display: 'flex', minHeight: '100%' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="inherit">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" width={'90px'}>
            <img src="/1.ico" alt="logo" style={{ width: '100px', height: '30px' }} />
          </Typography>
          <Container sx={{ width: '100%', mr: '15px' }} >
            <Badge sx={{ marginLeft: '90%', verticalAlign: '-25px' }} badgeContent={infoNotification ? infoNotification.length : 0} color="primary"><NotificationsIcon fontSize="large" />
            </Badge>
            <Button sx={{ float: 'right' }}>
              <Avatar alt="Remy Sharp" src={avatarUrl || undefined} />
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Inicio', icon: <HomeIcon />, href: '/home' },
            { text: 'Todas Instituições', icon: <LocalFireDepartmentRoundedIcon />, href: '/instituicoes' },
            { text: 'Ponstos De Coleta', icon: <Inventory2RoundedIcon />, href: '/pontoscoleta' },
            { text: 'Abrigos', icon: <NightShelterRoundedIcon />, href: '/abrigos' },
            { text: 'Rodovias', icon: <EditRoadIcon />, href: '/rodovias' },
            { text: 'Configurações', icon: <ManageAccountsIcon />, href: '/userSettings' },
          ].map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component="a"
                href={item.href}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>


        <Divider />
        <List>
          {[
            { text: 'Sair', icon: <LogoutIcon onClick={logout} />, href: '/' },
          ].map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component="a"
                href={item.href}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
        <Footer />
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          
            <Button onClick={handleCloseModal} variant="contained" color="secondary" fullWidth sx={{ marginRight: '10px', width: '47%', mt: '1px', mb: '1px', backgroundColor: '#23004C' }}>
              Voltar
            </Button>
          
        </>

      </Modal>
    </Box>
    ) : roleId === 4 ? (
 
      <Box sx={{ display: 'flex', minHeight: '100%' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="inherit">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <img src="/logo-sanofi.png" alt="logo" style={{ width: '76px', height: '20px' }} />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: 'Inicio', icon: <HomeIcon />, href: '/home' },
              { text: 'Novo voluntario', icon: <PersonAddIcon />, href: '/cadastroVoluntario' },
              { text: 'Gerenciar Voluntarios', icon: <SettingsSuggestIcon />, href: '/voluntarios' },

            ].map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component="a"
                  href={item.href}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[
              { text: 'Sair', icon: <LogoutIcon onClick={logout} />, href: '/' },
            ].map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component="a"
                  href={item.href}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {props.children}
          <Footer />
        </Box>
      </Box>

    ) : (
      <h1></h1>
    )}
         
          
             
     </div>
   );
 };
 
 
