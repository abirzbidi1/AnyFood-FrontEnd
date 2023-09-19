import { TablePagination, Table, TableSortLabel, TableHead, TableBody, TableRow, TableCell, CardContent, Avatar, InputAdornment, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { StyleCard, TableCellStyle, TableContainerStyle, BoxStyle, TypographyStyle, PaperStyle, FabStyle, InputBaseStyle } from './ManageUser.style';
import { useDeleteUserMutation, useGetUsersListQuery } from "../../../redux/api/user/userApi";
import { IUser } from '../../../types/interfaces/userInterface';
import { TableData } from "../../../config/constant/TableData";
import { CONFIG } from '../../../config/constant/config';
import LoadingPage from "../../../components/Loading";
import ErrorPage from "../../../components/Error";
import * as MuiIcons from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import CreateUser from './addUser/CreateUser';
import { ChangeEvent, useState } from 'react';

const ManageUser = () => {
    const access_token = localStorage.getItem("accessToken");
    const [token, setToken] = useState(access_token ? access_token : '');
    const [searched, setSearched] = useState("");
    const [per_page, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [order_column, setOrderColumn] = useState('created_at');
    const [order_type, setOrderType] = useState('desc');
    const { data, isError, isLoading, isSuccess } = useGetUsersListQuery({ page, per_page, searched, order_column, order_type });
    const [id, setId] = useState<number>();
    const [deleteUser] = useDeleteUserMutation();
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const handleOpen = () => { setOpenDialog(true); }
    const handleClose = () => { setOpenDialog(false); }
    const handleSort = (column: string) => {
        switch (column) {
            case 'First name': setOrderColumn('first_name');
                break;
            case 'Last name': setOrderColumn('last_name');
                break;
            case 'Email': setOrderColumn('email');
                break;
            case 'Phone number': setOrderColumn('phone_number');
                break;
            default:
                setOrderColumn('created_at');
        }
        order_type === 'asc' ? setOrderType('desc') : setOrderType('asc');
    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    const handleClickOpen = (idUser: number) => {
        setId(idUser);
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        if (id) {
            deleteUser(id);
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
                            <MuiIcons.People style={{ fontSize: '45px', color: '#404040' }} />
                            <TypographyStyle>
                                &nbsp;{t("manageUser.title")}
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
                                {t('manageUser.add_user')}
                            </FabStyle>
                            <CreateUser openDialog={openDialog} handleClose={handleClose} />
                        </BoxStyle>
                        <TableContainerStyle className="Table_custom_style" >
                            <Table aria-label="simple table" stickyHeader >
                                <TableHead>
                                    <TableRow >
                                        {TableData.map((data, index) => (
                                            <TableCellStyle className="head" align="center" key={index}>
                                                <TableSortLabel onClick={() => handleSort(data)}>{data}</TableSortLabel>
                                            </TableCellStyle>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.length > 0 && data.map((user: IUser, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" className="body">
                                                <Avatar src={CONFIG.IMAGE_URL_API + user.image} sx={{ ml: 2 }} />
                                            </TableCell>
                                            <TableCell className="body" align="center">{user.firstName}</TableCell>
                                            <TableCell align="center" className="body">{user.lastName}</TableCell>
                                            <TableCell align="center" className="body">{user.email}</TableCell>
                                            <TableCell align="center" className="body">{user.phoneNumber}</TableCell>
                                            <TableCell align="center" className="body">
                                                <MuiIcons.DeleteForever style={{ color: '#BF0000' }} onClick={() => handleClickOpen(user.id)} />
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
                            rowsPerPage={per_page}
                            page={page - 1}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </PaperStyle>
                </CardContent>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">
                        {t('manageUser.message')}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>{t('manageUser.cancel')}</Button>
                        <Button onClick={handleDelete}>{t('manageUser.delete')}</Button>
                    </DialogActions>
                </Dialog>
            </StyleCard>
        );
    } else {
        return null;
    }
}
export default ManageUser