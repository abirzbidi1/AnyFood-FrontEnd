import NavBarTest from "./navbar/Navbar";
import SidebarTest from "./sidebar/Sidebar";
import { Box } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import UseOpenSidebar from "../../hooks/useOpenSidebar";

export default function DashboardLayout() {
    const { openSidebar, handleOpen, handleClose } = UseOpenSidebar();
    return (
        <div style={{
            backgroundImage: "linear-gradient(#FFFFC3,#FFCB06)",
            color: "darkred",
        }}>
            <Box sx={{ display: 'flex' }}>
                <NavBarTest openSidebar={openSidebar} handleOpen={handleOpen} />
                <SidebarTest openSidebar={openSidebar} handleClose={handleClose} />
                <Outlet />
            </Box>
        </div>
    );
}