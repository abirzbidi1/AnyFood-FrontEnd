import { ListItem, ListItemIcon, ListItemText, Link,  List, Divider, IconButton } from '@mui/material';
import {  useTheme, } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarProp } from './sidebar.type';
import * as MuiIcons from '@material-ui/icons'
import { useTranslation } from 'react-i18next';
import { DrawerHeader, DrawerStyle } from './Sidebar.style';

export default function SidebarTest({ openSidebar, handleClose }: SidebarProp) {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <DrawerStyle variant="permanent" open={openSidebar} >
      <DrawerHeader>
        <IconButton onClick={handleClose} sx={{ color: '#be1622' }}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem >
          <ListItemIcon sx={{ color: '#be1622' }}>
            <MuiIcons.Home />
          </ListItemIcon>
          <Link href='/home' sx={{ color: '#404040'}}>
            <ListItemText primary={t("sidebar.home")} />
          </Link>
        </ListItem>
        <ListItem >
          <ListItemIcon sx={{ color: '#be1622' }}>
            <MuiIcons.People />
          </ListItemIcon>
          <Link href='/manage-users' sx={{ color: '#404040' }}>
            <ListItemText primary={t("sidebar.manage_user")} />
          </Link>
        </ListItem>
        <ListItem >
          <ListItemIcon sx={{ color: '#be1622' }}>
            <MuiIcons.Restaurant />
          </ListItemIcon>
          <Link href='/manage-restaurants' sx={{ color: '#404040' }}>
          <ListItemText primary={t("sidebar.manage_restaurant")} />
          </Link>
        </ListItem>
      </List>
      <Divider />
    </DrawerStyle>
  );
}