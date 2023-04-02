import { ListItem, ListItemIcon, ListItemText, Link, Drawer, List, Divider, IconButton } from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarProp } from './sidebar.type';
import * as MuiIcons from '@material-ui/icons'
import { useTranslation } from 'react-i18next';
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
const DrawerStyle = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    backgroundColor: '#be1622',
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