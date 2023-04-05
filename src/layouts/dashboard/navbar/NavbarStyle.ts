import { IconButton, Typography } from "@material-ui/core";
import { styled } from "@mui/system";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { drawerWidth } from "../sidebar/Sidebar.constants";
import { CSSObject } from "@mui/material";
/*
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
);*/
export const IconButtonStyle = styled(IconButton)({
  color: "#be1222",
});

export const TypographyStyle = styled(Typography)({
  flexGrow: 1,
  marginTop: "10px",
  textAlignLast: "left",
});
