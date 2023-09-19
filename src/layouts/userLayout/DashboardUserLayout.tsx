import { Box } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import NavbarUser from "../dashboard/navbar/navbarUser";

export default function DashboardUserLayout() {
    return (
        <div style={{
            backgroundImage: "linear-gradient(#FFFFC3,#FFCB06)",
            color: "darkred",
        }}>
            <Box sx={{ display: 'flex' }}>
                <NavbarUser />
                <Outlet />
            </Box>
        </div>
    );
}