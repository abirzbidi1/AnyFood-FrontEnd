import NavBarTest from "./navbar/Navbar";
import SidebarTest from "./sidebar/Sidebar";
import { Box } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import UseOpenSidebar from "../../hooks/useOpenSidebar";
import ManageUser from "../../features/responsible/ManageUser/ManageUser";

export default function DashboardLayout() {
    const {openSidebar, handleOpen, handleClose } = UseOpenSidebar();
    return (
        <Box sx={{display: 'flex'}}>
            <NavBarTest openSidebar={openSidebar} handleOpen={handleOpen}/>
            <SidebarTest openSidebar={openSidebar} handleClose={handleClose}/>     
            <ManageUser/>
            <Outlet/>
        </Box>
    );
}