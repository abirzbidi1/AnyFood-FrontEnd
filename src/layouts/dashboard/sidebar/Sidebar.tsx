import { ListItem, ListItemIcon, ListItemText, Link, List, Divider, IconButton, Badge } from '@mui/material';
import { useTheme, } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarProp } from './sidebar.type';
import * as MuiIcons from '@material-ui/icons'
import { useTranslation } from 'react-i18next';
import { AvatarStyle, DrawerHeader, DrawerStyle } from './Sidebar.style';
import { CONFIG } from '../../../config/constant/config';
import { useGetTotalOrderQuery } from '../../../redux/api/order/orderApi';

export default function SidebarTest({ openSidebar, handleClose }: SidebarProp) {
  const theme = useTheme();
  const { t } = useTranslation();
  const user = localStorage.getItem('user');
  const info = JSON.parse(user ? user : '');
  const { data: totalOrder, error, isLoading } = useGetTotalOrderQuery();

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite lors de la récupération du total des commandes.</div>;
  }
  
  return (
    <DrawerStyle variant="permanent" open={openSidebar} >
      <DrawerHeader>
        <AvatarStyle src={CONFIG.IMAGE_URL_API + info?.image} alt='User'></AvatarStyle>
        <h3>{info?.first_name}</h3>
        <br />
        <IconButton onClick={handleClose} sx={{ color: '#be1622' }}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>

      </DrawerHeader>

      <Divider />
      <List>
        <Link href='/home' sx={{ color: '#404040' }}>
          <ListItem >
            <ListItemIcon sx={{ color: '#be1622' }}>
              <MuiIcons.Home />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.home")} />
          </ListItem>
        </Link>
        <Link href='/manage-users' sx={{ color: '#404040' }}>
        <ListItem >
          <ListItemIcon sx={{ color: '#be1622' }}>
            <MuiIcons.People />
          </ListItemIcon>
            <ListItemText primary={t("sidebar.manage_user")} />
        </ListItem>
          </Link>
          <Link href='/manage-restaurants' sx={{ color: '#404040' }}>
            <ListItem >
          <ListItemIcon sx={{ color: '#be1622' }}>
            <MuiIcons.Restaurant />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.manage_restaurant")} />
        </ListItem>
          </Link>
          <Link href='/manage-orders' sx={{ color: '#404040' }}>
            <ListItem >
          <ListItemIcon sx={{ color: '#be1622' }}>
          <Badge badgeContent={totalOrder} color="warning" showZero>
            <MuiIcons.ShoppingCart />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={t("sidebar.manage_order")} />
        </ListItem>
          </Link>
      </List>
      <Divider />
    </DrawerStyle>
  );
}