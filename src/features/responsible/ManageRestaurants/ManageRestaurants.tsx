import { TablePagination, Table, TableSortLabel, TableHead, TableBody, TableRow, TableCell, CardContent, Avatar, InputAdornment, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { StyleCard, TableCellStyle, TableContainerStyle, BoxStyle, TypographyStyle, PaperStyle, FabStyle, InputBaseStyle } from './ManageRestaurants.style';
import { useDeleteRestaurantMutation } from "../../../redux/api/restaurant/restoApi";
import { IRestaurant } from '../../../types/interfaces/restoInterface';
import { CONFIG } from '../../../config/constant/config';
import LoadingPage from "../../../components/Loading";
import ErrorPage from "../../../components/Error";
import * as MuiIcons from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useState } from 'react';
import { useGetRestaurantsListQuery } from "../../../redux/api/restaurant/restoApi";
import { RestaurantTableData } from "../../../config/constant/RestaurantTableData";

import { useNavigate } from "react-router-dom";
const ManageRestaurant = () => {
    const access_token = localStorage.getItem("accessToken");
    const [token, setToken] = useState(access_token ? access_token : '');
    const [searched, setSearched] = useState("");
    const [perPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [orderColumn, setOrderColumn] = useState('created_at');
    const [orderType, setOrderType] = useState('desc');
    const { data, isError, isLoading, isSuccess } = useGetRestaurantsListQuery({ page, perPage, searched, orderColumn, orderType });
    const [id, setId] = useState<number>();
    const [deleteRestaurant] = useDeleteRestaurantMutation();
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleOpen = () => { navigate('/restaurant'); }
    const handleClose = () => { setOpenDialog(false); }
    const handleSort = (column: string) => {
        switch (column) {
            case 'Name': setOrderColumn('name');
                break;
            case 'Address': setOrderColumn('address');
                break;
            case 'Description': setOrderColumn('description');
                break;
            case 'Phone number': setOrderColumn('phone_number');
                break;
            default:
                setOrderColumn('created_at');
        }
        orderType === 'asc' ? setOrderType('desc') : setOrderType('asc');
    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    const handleClickOpen = (idRestaurant: number|undefined) => {
        setId(idRestaurant);
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        if (id) {
            deleteRestaurant(id);
            setOpen(false);
        }
     
    };
    if (isLoading) {
        return <LoadingPage />;
    }
    if (isError) {
        return <ErrorPage />;
    }
    if (isSuccess) {
        return (
            <StyleCard>
               <br/><br/><br/>
                <CardContent >
                    <PaperStyle >
                        <BoxStyle>
                            <MuiIcons.Restaurant style={{ fontSize: '45px', color: '#404040' }} />
                            <TypographyStyle>  
                             &nbsp;{t("manageRestaurant.title")}
                            </TypographyStyle>
                            <InputBaseStyle autoFocus placeholder="Search" value={searched}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <MuiIcons.Search />
                                    </InputAdornment>
                                }
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearched(event.target.value)} />
                            <FabStyle variant="extended" color="success" onClick={handleOpen}>
                                <MuiIcons.Add />
                                {t('manageRestaurant.add_restaurant')}
                            </FabStyle>
                        </BoxStyle>
                        <TableContainerStyle className="Table_custom_style" >
                            <Table aria-label="simple table" stickyHeader >
                                <TableHead>
                                    <TableRow >
                                        {RestaurantTableData.map((data, index) => (
                                            <TableCellStyle className="head" align="center" key={index}>
                                                <TableSortLabel onClick={() => handleSort(data)}>{data}</TableSortLabel>
                                            </TableCellStyle>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.length > 0 && data.map((restaurant: IRestaurant, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" className="body">
                                                <Avatar src={CONFIG.IMAGE_URL_API + restaurant.logo} sx={{ ml: 2 }} />
                                            </TableCell>
                                            <TableCell className="body" align="center">{restaurant.name}</TableCell>
                                            <TableCell align="center" className="body">{restaurant.address}</TableCell>
                                            <TableCell align="center" className="body">{restaurant.description}</TableCell>
                                            <TableCell align="center" className="body">{restaurant.phoneNumber}</TableCell>
                                            <TableCell align="center" className="body">
                                                <MuiIcons.Edit style={{ color: '#2E7D32' }} onClick={() => handleClickOpen(restaurant.id)} /> &nbsp; &nbsp;
                                                <MuiIcons.DeleteForever style={{ color: '#BF0000' }} onClick={() => handleClickOpen(restaurant.id)} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainerStyle>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20]}
                            component="div"
                            count={data.length}
                            rowsPerPage={perPage}
                            page={page - 1}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </PaperStyle>
                </CardContent>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">
                        {t('manageRestaurant.message')}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>{t('manageRestaurant.cancel')}</Button>
                        <Button onClick={handleDelete}>{t('manageRestaurant.delete')}</Button>
                    </DialogActions>
                </Dialog>
            </StyleCard>
        );
    } else {
        return null;
    }
}
export default ManageRestaurant