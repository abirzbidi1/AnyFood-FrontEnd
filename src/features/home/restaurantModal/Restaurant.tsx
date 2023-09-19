import React from 'react';
import { Typography, Stack, CircularProgress, Table, TableBody, TableRow, TableCell, Fab } from '@mui/material';
import { useShowRestaurantQuery } from '../../../redux/api/restaurant/restoApi';
import { CONFIG } from '../../../config/constant/config';
import { PaperStyle, StyledImage, StyledModal, StyledTableCell } from './Restaurant.style';
import * as MuiIcons from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

interface RestaurantModalProps {
    id: number;
    open: boolean;
    onClose: () => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ id, open, onClose }) => {

    const { data: restaurant, isLoading, isError } = useShowRestaurantQuery(id);
    const navigate = useNavigate();

    const handleNavigate = (id: number) => {
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user ? user : '');
        if (userData.is_responsible === true) {
            navigate(`/menu/${id}`);
        }else{
            navigate(`/user/menu/${id}`);
        }
        
    };
    return (
        <StyledModal open={open} onClose={onClose}>
            <PaperStyle>
                {isLoading && <Stack spacing={2} direction="row" marginLeft={'30%'}>
                    <CircularProgress color="error" />
                    <CircularProgress color="error" />
                    <CircularProgress color="error" />
                </Stack>}
                {isError && <Typography>Error loading restaurant data.</Typography>}
                {restaurant && (

                    <Stack>
                        <Table>
                            <TableBody sx={{ alignSelf: 'right', padding: 0 }}>
                                <TableRow style={{ borderBottom: "none" }}>
                                    <TableCell align="center" style={{ padding: "0px 0px 0px 32%" }} colSpan={2}>
                                        <StyledImage src={CONFIG.IMAGE_URL_API + restaurant.logo} />
                                    </TableCell>
                                </TableRow>
                                <TableRow style={{ borderBottom: "none" }}>
                                    <StyledTableCell align="left"> <h2><MuiIcons.Restaurant /> Name </h2> </StyledTableCell>
                                    <StyledTableCell align="left"><h3> {restaurant.name}</h3> </StyledTableCell>
                                </TableRow>

                                <TableRow >
                                    <StyledTableCell align="left"> <h2><MuiIcons.Description />Description  </h2> </StyledTableCell>
                                    <StyledTableCell align="left"> <h3>{restaurant.description}</h3> </StyledTableCell>
                                </TableRow>

                                <TableRow >
                                    <StyledTableCell align="left"> <h2><MuiIcons.LocationOn />Address</h2> </StyledTableCell>
                                    <StyledTableCell align="left"> <h3>{restaurant.address}</h3> </StyledTableCell>
                                </TableRow>

                                <TableRow >
                                    <StyledTableCell align="left"> <h2><MuiIcons.Phone />Phone number</h2> </StyledTableCell>
                                    <StyledTableCell align="left"> <h3>{restaurant.phoneNumber}</h3> </StyledTableCell>
                                </TableRow>

                                <TableRow >
                                    <StyledTableCell align="center">
                                        <Fab variant="extended" color="inherit" onClick={onClose}>
                                            <MuiIcons.CloseOutlined />
                                            Cancel
                                        </Fab>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Fab variant="extended" color="error" onClick={() => handleNavigate(restaurant.id)}>
                                            <MuiIcons.Menu />
                                            Menu
                                        </Fab>
                                    </StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Stack>
                )}
            </PaperStyle>
        </StyledModal>
    );
};

export default RestaurantModal;