import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import * as MuiIcons from '@material-ui/icons';
import { DialogProps } from "../../../config/constant/DialogProps";
import { DialogStyle, DialogTitleStyle, IconButtonStyle} from "./orderModal.style";
import { useTranslation } from "react-i18next";
import { useDeleteOrderMutation, useGetUserOrderQuery } from "../../../redux/api/order/orderApi";
import { IOrder } from "../../../types/interfaces/orderInterface";
import ItemDetail from "../../responsible/Manage orders/itemDetails";
import { OrderData } from "./orderData";
import { useState } from "react";

export default function OrderModal({ openDialog, handleClose }: DialogProps) {
   const { data} = useGetUserOrderQuery();
   const [deleteOrder]=useDeleteOrderMutation();
   const [id, setId] = useState<number>();
   const [open, setOpen] = useState(false)
  const { t } = useTranslation();
  const handleClickOpen = (idUser: number) => {
    setId(idUser);
    setOpen(true);
};
const handleCloseDialog = () => {
    setOpen(false);
};
const handleDelete = () => {
    if (id) {
        deleteOrder(id);
        setOpen(false);
    }
};
        return (
            <DialogStyle open={openDialog} onClose={handleClose}>
                <DialogTitleStyle > <MuiIcons.ShoppingBasket /> My orders  </DialogTitleStyle>
                <IconButtonStyle aria-label="close" onClick={handleClose}>
                    <MuiIcons.Close />
                </IconButtonStyle>
                <DialogContent>
                <TableContainer className="Table_custom_style" >
                <Table aria-label="simple table" stickyHeader >
                                <TableHead>
                                    <TableRow >
                                        {OrderData.map((data, index) => (
                                            <TableCell className="head" align="center" key={index} style={{ fontWeight: 'bold' }}>
                                                {data}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data && data.map((order: IOrder, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" className="body">
                                                <ItemDetail itemId={order.item_id} />
                                            </TableCell>
                                            <TableCell align="center" className="body">{order.quantity}</TableCell>
                                            <TableCell align="center" className="body">{order.amount}</TableCell>
                                            <TableCell className="body" align="center">
                                            <MuiIcons.DeleteForever style={{ color: '#BF0000' }} onClick={() => handleClickOpen(order.id)} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" color="inherit" onClick={handleClose}>{t("editProfile.buttonReset")}</Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">
                        {t('manageUser.message')}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>{t('manageUser.cancel')}</Button>
                        <Button onClick={handleDelete}>{t('manageUser.delete')}</Button>
                    </DialogActions>
                </Dialog>
                </DialogContent>
            </DialogStyle >
        );
    }