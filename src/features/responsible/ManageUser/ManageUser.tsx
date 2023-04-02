import { TablePagination, Table, TableSortLabel, TableHead, TableBody, TableRow, TableCell, CardHeader, CardContent, Avatar } from "@mui/material";
import { StyleCard, TableCellStyle, TableContainerStyle, BoxStyle, TypographyStyle, PaperStyle, FabStyle } from './ManageUser.style';
import { useDeleteUserMutation, useGetUsersListQuery } from "../../../redux/api/userApi";
import { IUser } from '../../../types/interfaces/userInterface';
import { TableData } from "../../../config/constant/TableData";
import { CONFIG } from '../../../config/constant/config';
import LoadingPage from "../../../components/Loading";
import ErrorPage from "../../../components/Error";
import * as MuiIcons from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import SearchBar from 'material-ui-search-bar';
import CreateUser from './addUser/CreateUser';
import { ChangeEvent, useState } from 'react';

const ManageUser = () => {
    
    const { data, isError, isLoading, isSuccess } = useGetUsersListQuery();
    const [rows, setRows] = useState<IUser[] | undefined>(data);
    const [searched, setSearched] = useState<string>("");
    const [openDialog, setOpenDialog] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const { t } = useTranslation();

    const handleOpen = () => { setOpenDialog(true); }
    const handleClose = () => { setOpenDialog(false); }
    const [deleteUser] = useDeleteUserMutation();
    const handleDelete = (id: number) => {
        deleteUser(id);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const cancelSearch = () => {
        setSearched("");
    };
    const requestSearch = (searchedVal: string) => {
        if (data) {
            const filteredRows = data.filter((row: IUser) => {
                return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setRows(filteredRows);
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
                <CardHeader title="Manage User"> </CardHeader>
                <CardContent >
                    <PaperStyle >
                        <BoxStyle>
                            <MuiIcons.People style={{ fontSize: '45px', color: '#404040' }} />
                            <TypographyStyle>
                                &nbsp;{t("manageUser.title")}
                            </TypographyStyle>
                            <SearchBar
                                value={searched}
                                onChange={(searchVal: string) => requestSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                            />
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
                                                <TableSortLabel>{data}</TableSortLabel>
                                            </TableCellStyle>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows && rows.map((user: IUser, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" className="body">
                                                <Avatar src={CONFIG.IMAGE_URL_API + user.image} sx={{ ml: 2 }} />
                                            </TableCell>
                                            <TableCell className="body" align="center"> {user.firstName}</TableCell>
                                            <TableCell align="center" className="body">{user.lastName}</TableCell>
                                            <TableCell align="center" className="body">{user.email}</TableCell>
                                            <TableCell align="center" className="body">{user.phoneNumber}</TableCell>
                                            <TableCell align="center" className="body">
                                                <MuiIcons.DeleteForever style={{ color: '#BF0000' }} onClick={() => window.confirm("are you sure to delete "+user.firstName+"?") ? handleDelete(user.id) :  window.alert("Deletion canceled!")} />
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
                    </PaperStyle>
                </CardContent>
            </StyleCard>
        );
    } else {
        return null;
    }
}
export default ManageUser