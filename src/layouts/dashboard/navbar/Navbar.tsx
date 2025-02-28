import { useState } from 'react';
import { MenuItem, Box, styled, Menu, Select, SvgIcon, IconButton, Toolbar, Link } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { NavbarProp } from './Navbar.type';
import logoToAdd from '../../../assets/images/anyfood.png';
import { NavBarData } from './NavBar.constants';
import { AccountCircle, Language, MenuOutlined } from '@mui/icons-material'
import { IconButtonStyle, TypographyStyle } from './NavbarStyle';
import { US, FR } from 'country-flag-icons/react/3x2'
import { useTranslation } from "react-i18next";
import { drawerWidth } from '../sidebar/Sidebar.constants';
import { Navigate } from 'react-router-dom';
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(
  ({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);
export default function NavBarTest({ openSidebar, handleOpen }: NavbarProp) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { i18n } = useTranslation();
  let token = localStorage.getItem('accessToken');
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={openSidebar} sx={{ bgcolor: '#be1222' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleOpen}>
            <MenuOutlined />
          </IconButton>
          <TypographyStyle>
            <img src={logoToAdd} alt='AnyFood' />
          </TypographyStyle>
          <div>
            <IconButton style={{ marginTop: -15 }} size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
              onClick={handleOpenUserMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu sx={{ mt: '50px' }} id="menu-appbar" anchorEl={anchorElUser} keepMounted
              anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
              transformOrigin={{ vertical: 'top', horizontal: 'right', }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
    {NavBarData.map((data, index) => {
  const handleClick = () => {
    if (data.order === 2) {
      localStorage.removeItem('accessToken'); 
      localStorage.removeItem('user');
    }
    handleCloseUserMenu();
  };

  return (
    <MenuItem key={index} onClick={handleClick} sx={{ color: '#be1622' }}>
      <IconButtonStyle > {data.icon}</IconButtonStyle>
      <Link href={data.path} >{data.title}</Link>
    </MenuItem>
  );
})}
            </Menu>
            <Select onChange={onClickLanguageChange} sx={{ width: 90, color: 'white', height: 30, mt: 2 }}
              defaultValue="" displayEmpty
              renderValue={(value) => {
                return (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <SvgIcon ><Language /></SvgIcon>
                    {value}
                  </Box>
                );
              }}>
              <MenuItem value='en'><US style={{ width: 20 }} />&nbsp; english</MenuItem>
              <MenuItem value='fr'><FR style={{ width: 20 }} /> &nbsp; french</MenuItem>
            </Select>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}