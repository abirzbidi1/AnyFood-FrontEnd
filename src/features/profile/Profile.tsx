import { CardContent, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { AvatarStyle, BoxContentStyle, BoxStyle, FabStyle, PaperStyle, StyleCard, TypographyStyle } from "./Profile.style";
import * as MuiIcons from '@material-ui/icons';
import { CONFIG } from "../../config/constant/config";
import UpdateProfile from "../updateProfile/UpdateProfile";
import { useTranslation } from 'react-i18next';
import ChangePassword from "../updateProfile/ChangePassword/ChangePassword";
import UseOpenSidebar from "../../hooks/useOpenSidebar";

export default function Profile() {
    const user = localStorage.getItem('user');
    const info = JSON.parse(user ? user : '');
    const { openSidebar: openDialog, handleOpen, handleClose } = UseOpenSidebar();
    const { openSidebar: openDialogPassword, handleOpen: handleOpenPassword, handleClose: handleClosePassword } = UseOpenSidebar();

    const { t } = useTranslation();

    return (
        <StyleCard>
            <br /> <br /> <br />
            <BoxStyle>
                <MuiIcons.Person style={{ fontSize: '45px', color: '#404040' }} />
                <TypographyStyle>
                    &nbsp; {t("profile.title")}
                </TypographyStyle>
                <FabStyle variant="extended" color="success" onClick={handleOpen}>
                        <MuiIcons.Edit />  {t("profile.buttonEditProfile")}
                    </FabStyle>
                    <FabStyle variant="extended" color="success" onClick={handleOpenPassword}>
                        <MuiIcons.Lock />  {t("profile.buttonEditPassword")}
                    </FabStyle>
                <UpdateProfile openDialog={openDialog} handleClose={handleClose} />
                <ChangePassword openDialogPassword={openDialogPassword} handleClosePassword={handleClosePassword} />
            </BoxStyle>
            <CardContent >
                <PaperStyle >
                    <BoxContentStyle>
                        <Table>
                            <TableBody sx={{ alignSelf: 'right', padding: 0 }}>
                                <TableRow style={{ borderBottom: "none" }}>
                                    <TableCell align="left" style={{ width: '250px', padding: "0px 0px 20px 16px" }}>
                                        <AvatarStyle src={CONFIG.IMAGE_URL_API + info?.image} alt='User'></AvatarStyle>
                                    </TableCell>
                                </TableRow>
                                <TableRow style={{ borderBottom: "none" }}>
                                    <TableCell align="left" style={{ width: '180px', borderBottom: "none", padding: "0px 0px 0px 16px" }}> <h2>{t("profile.firstName")} </h2> </TableCell>
                                    <TableCell align="left" style={{ borderBottom: "none", padding: "0px 0px 0px 16px", textTransform: 'capitalize' }}><h3> {info?.first_name}</h3> </TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell align="left" style={{ width: '180px', borderBottom: "none", padding: "0px 0px 0px 16px" }}> <h2>{t("profile.lastName")} </h2> </TableCell>
                                    <TableCell align="left" style={{ borderBottom: "none", padding: "0px 0px 0px 16px", textTransform: 'capitalize' }}> <h3>{info?.last_name}</h3> </TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell align="left" style={{ width: '180px', borderBottom: "none", padding: "0px 0px 0px 16px" }}> <h2>{t("profile.PhoneNumber")} </h2> </TableCell>
                                    <TableCell align="left" style={{ borderBottom: "none", padding: "0px 0px 0px 16px" }}> <h3>{info?.phone_number}</h3> </TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell align="left" style={{ width: '180px', borderBottom: "none", padding: "0px 0px 0px 16px" }}> <h2>{t("profile.email")}</h2> </TableCell>
                                    <TableCell align="left" style={{ borderBottom: "none", padding: "0px 0px 0px 16px" }}> <h3>{info?.email}</h3> </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </BoxContentStyle>
                </PaperStyle>
            </CardContent>
        </StyleCard>
    );
}