import * as MuiIcons from '@material-ui/icons';

export const NavBarData = [
    {
        title: 'Profile',
        path: '/me',
        order: 1,
        icon: <MuiIcons.Person/>
        
    },
    {
        title: 'Logout',
        path: '/auth/login',
        order: 2,
        icon: <MuiIcons.ExitToApp/>
        
    },
]