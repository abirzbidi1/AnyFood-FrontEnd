import { ChangeEvent, useState } from 'react';
import { useDeleteUserMutation, useGetUsersListQuery } from "../../../redux/api/userApi";
import { TablePagination, Table, TableSortLabel, TableHead, TableBody, IconButton, TableRow, TableCell, Fab, CardHeader, CardContent, Avatar, Paper } from "@mui/material";
import LoadingPage from "../../../components/Loading";
import ErrorPage from "../../../components/Error";
import { TableData } from "../../../config/constant/TableData";
import { IUser } from '../../../types/interfaces/userInterface';
import * as MuiIcons from '@material-ui/icons';
import CreateUser from './addUser/CreateUser';
import { InputBaseStyle, StyleCard, TableCellStyle, TableContainerStyle, BoxStyle, PaperStyle } from './ManageUser.style';

const ManageUser = () => {
    const { data, isError, isLoading, isSuccess } = useGetUsersListQuery();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpen = () => { setOpenDialog(true); }
    const handleClose = () => { setOpenDialog(false); }
    const [deleteUser] = useDeleteUserMutation();
    const handleDelete = (id: number) => {
        deleteUser(id);
    };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                <CardHeader title="Manage User"> </CardHeader>
                <CardContent >
                    <Paper >
                        <BoxStyle>
                            <PaperStyle >
                                <InputBaseStyle placeholder="Search User" />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <MuiIcons.Search />
                                </IconButton>
                            </PaperStyle>
                            <Fab variant="extended" size="small" color="success" onClick={handleOpen}>
                                <MuiIcons.Add />
                                New user
                            </Fab>
                            <CreateUser openDialog={openDialog} handleClose={handleClose} />
                        </BoxStyle>
                        <TableContainerStyle className="Table_custom_style" >
                            <Table aria-label="simple table" stickyHeader>
                                <TableHead>
                                    <TableRow >
                                        {TableData.map((data, index) => (
                                            <TableCellStyle className="head" align="center" key={index}>
                                                <TableSortLabel>{data}</TableSortLabel>
                                            </TableCellStyle>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.length > 0 && data.map((user: IUser, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" className="body">
                                                <Avatar src={"http://127.0.0.1/anyfood-api/storage/app/" + user.image} sx={{ ml: 2 }} />
                                            </TableCell>
                                            <TableCell className="body" align="center"> {user.firstName}</TableCell>
                                            <TableCell align="center" className="body">{user.lastName}</TableCell>
                                            <TableCell align="center" className="body">{user.email}</TableCell>
                                            <TableCell align="center" className="body">{user.phoneNumber}</TableCell>
                                            <TableCell align="center" className="body">
                                                <Fab variant="extended" size="small" color="error" sx={{ zIndex: 1 }} onClick={() => window.confirm("Are you sure ?") ? handleDelete(user.id) : console.log('action canceled !')}>
                                                    <MuiIcons.DeleteForever />
                                                </Fab>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainerStyle>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </CardContent>
            </StyleCard>
        );
    } else {
        return null;
    }
}
export default ManageUser