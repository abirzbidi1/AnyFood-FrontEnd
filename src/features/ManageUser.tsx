import React from "react";
import { useGetUsersListQuery } from "../redux/api/userApi";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from "@mui/material";
import { IUser } from "../types/interfaces/userInterface";
import LoadingPage from "./Loading";

/*const cols = [
    'First name',
    'Last name',
    'email',
    'image',
    'Phone number',
];*/

const ManageUser = () => {
    const { data, isError, isLoading, isSuccess } = useGetUsersListQuery();
    console.log(data);
    if (isLoading) {
        return <LoadingPage />;
    }
    if (isError) {
        return <div> Something went wrong...</div>
    }
    if (isSuccess) {
        return (
            <TableContainer className="Table_custom_style" component={Paper} sx={{ maxHeight: "400px" }} >
                <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                     <TableRow>
                            <TableCell className="head" align="center">
                                first name
                            </TableCell>
                            <TableCell className="head" align="center">
                                last name
                            </TableCell>
                            <TableCell className="head" align="center">
                                email
                            </TableCell>
                            <TableCell className="head" align="center">
                                image
                            </TableCell>
                            <TableCell className="head" align="center">
                                phone number
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="rowtable">
                       
                           { data.length>0 && data.map((user: IUser, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="body" align="center">
                                        {user.firstName}
                                    </TableCell>
                                    <TableCell align="center" className="body">
                                        {user.lastName}
                                    </TableCell>
                                    <TableCell align="center" className="body">
                                        {user.email}
                                    </TableCell>
                                    <TableCell align="center" className="body">
                                        <img src={user.image} />
                                    </TableCell>
                                    <TableCell align="center" className="body">
                                        {user.phoneNumber}
                                    </TableCell>
                                </TableRow>
                            ))}
                           
                    </TableBody>
                </Table>

            </TableContainer>
        );
    } else {
        return null;
    }
};

export default ManageUser
