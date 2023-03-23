import { makeStyles } from "@material-ui/core";

const SidebarStyles = makeStyles((theme) => ({
    menuSliderContainer: {
        width: 250,
        background: "#be1622",
        height: "100%"
    },
    listItem: {
        color: "white"
    },
    avatar: {
        margin: "0.5rem auto",
        padding: "1rem",
        width: theme.spacing(13),
        height: theme.spacing(13)
    },
}));

export default SidebarStyles