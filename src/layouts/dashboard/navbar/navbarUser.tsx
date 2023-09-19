import { useState } from 'react';
import { MenuItem, Box, styled, Menu, Select, SvgIcon, IconButton, Toolbar, Link, Badge } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import logoToAdd from '../../../assets/images/anyfood.png';
import * as MuiIcons from '@material-ui/icons';
import { AccountCircle, Language } from '@mui/icons-material'
import { IconButtonStyle, TypographyStyle } from './NavbarStyle';
import { US, FR } from 'country-flag-icons/react/3x2'
import { useTranslation } from "react-i18next";
import { drawerWidth } from '../sidebar/Sidebar.constants';
import { useNavigate } from 'react-router-dom';
import { useCountUSerOrderQuery } from '../../../redux/api/order/orderApi';
import UseOpenSidebar from '../../../hooks/useOpenSidebar';
import OrderModal from '../../../features/home/orderModal/orderModal';
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
export default function NavbarUser() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const { data: totalOrder } = useCountUSerOrderQuery();
    const { openSidebar: openDialog, handleOpen, handleClose } = UseOpenSidebar();

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
    const GoHome = () => {
        navigate('/user/home');
    }
    const LogOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/auth/login');
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar sx={{ bgcolor: '#be1222' }}>
                <Toolbar>
                    <TypographyStyle>
                        <img src={logoToAdd} alt='AnyFood' onClick={GoHome} style={{ cursor: "pointer" }} />
                    </TypographyStyle>
                    <div style={{ display: "flex", gap: 2 }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
                           onClick={handleOpen} color="inherit">
                            <Badge badgeContent={totalOrder} color="warning" showZero>
                                <MuiIcons.ShoppingBasket />
                            </Badge>
                            <OrderModal openDialog={openDialog} handleClose={handleClose} />
                        </IconButton>

                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
                            onClick={handleOpenUserMenu} color="inherit">
                            <AccountCircle />
                        </IconButton>

                        <Menu id="menu-appbar" anchorEl={anchorElUser} keepMounted
                            anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>

                            <MenuItem sx={{ color: '#be1622' }}>
                                <IconButtonStyle > <MuiIcons.Person /></IconButtonStyle>
                                <Link href='/user/me' >Profile</Link>
                            </MenuItem>
                            <MenuItem sx={{ color: '#be1622' }} onClick={LogOut}>
                                <IconButtonStyle > <MuiIcons.ExitToApp /></IconButtonStyle>
                                Logout
                            </MenuItem>
                        </Menu>
                        <Select onChange={onClickLanguageChange} sx={{ width: 90, color: 'white', height: 30, mt: 2 }}
                            defaultValue="" displayEmpty
                            renderValue={(value) => {
                                return (
                                    <>
                                        <SvgIcon ><Language /></SvgIcon>
                                        {value}
                                    </>
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