import React, { useEffect, useState } from 'react';
import { PaperStyle, StyledModal } from '../../Restaurant.style';
import * as MuiIcons from '@material-ui/icons';
import { useGetAllSupplementsQuery } from '../../../../../redux/api/menu/menuApi';
import { Card, CardActions, CardContent, Checkbox, Fab, Grid, Typography } from '@mui/material';
import {  ISupplement } from '../../../../../types/interfaces/menuInterface';
import { CONFIG } from '../../../../../config/constant/config';
import { StyledFab } from './order.style';
import { usePassOrderMutation } from '../../../../../redux/api/order/orderApi';
import { OrderProps } from './order.type';
import { useNavigate } from 'react-router-dom';

const Order: React.FC<OrderProps> = ({ id, open, item, onClose }) => {
    const { data: supplements } = useGetAllSupplementsQuery(id);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedSupplements, setSelectedSupplements] = useState<ISupplement[]>([]);
    const [passOrder, {isSuccess}] = usePassOrderMutation();
    const userId = localStorage.getItem('user');
    const navigate = useNavigate();
    const handleIncrement = (price: number) => {
        setQuantity(quantity + 1);
        const result = price * (quantity + 1);
        setTotal(result);
    };

    const handleDecrement = (price: number) => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            const result = price * (quantity - 1);
            setTotal(result);
        }
    };
if(isSuccess){
    if (userId) {
        const user = JSON.parse(userId);
        if(user.is_responsible===true){
            navigate('/home');
        }else{
            navigate('/user/home');
        }
    }
    
    
}
    const handleCheckboxClick = (supplement: ISupplement) => {
        const isAlreadySelected = selectedSupplements.some((s) => s.id === supplement.id);
        if (isAlreadySelected) {
            setSelectedSupplements(selectedSupplements.filter((s) => s.id !== supplement.id));
        } else {
            setSelectedSupplements([...selectedSupplements, supplement]);
        }
    };

    const calculateTotalPrice = () => {
        let totalPrice = item ? item.price * quantity : 0;
        selectedSupplements.forEach((supplement) => {
            totalPrice += parseFloat(supplement.price);
        });
        setTotal(totalPrice);
    };
    useEffect(() => {
        calculateTotalPrice();
    }, [selectedSupplements, quantity, item]);

    const placeOrderHandler = () => {
        if (userId) {
            const userObject = JSON.parse(userId);
            if (!userObject.id || !item || quantity <= 0) {
                return;
            }
            const orderVariables = {
                user_id: userObject.id,
                item_id: item.id,
                quantity: quantity,
                amount: total,
            };
            console.log(orderVariables);
            passOrder({
                variables: orderVariables,
                
            });
        }
    };

    return (
        <StyledModal open={open} onClose={onClose}>
            <PaperStyle>
                <Grid item xs={12}>
                    {item && <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                            <img
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                                src={CONFIG.IMAGE_URL_API + item.image}
                                alt={item.name}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" style={{ textTransform: 'capitalize' }}>{item.name}</Typography>
                            <Typography variant="h6">{item.price}Dt</Typography>
                            <Typography >Quantity: <StyledFab color='warning' onClick={() => handleDecrement(item.price)}>
                                -
                            </StyledFab>
                                <span > {quantity}   </span>
                                <StyledFab color='success' onClick={() => handleIncrement(item.price)}>
                                    +
                                </StyledFab></Typography>
                            <Typography >Total: {total}Dt </Typography>
                        </Grid>
                    </Grid>}
                </Grid>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            {supplements &&
                                supplements.map((supplement: ISupplement, index: number) => (
                                    <Grid item xs={12} key={index}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item>
                                                <Checkbox
                                                    color='success'
                                                    checked={selectedSupplements.some((s) => s.id === supplement.id)}
                                                    onChange={() => handleCheckboxClick(supplement)}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <img
                                                    style={{ width: 45, height: 45, borderRadius: 50 }}
                                                    src={CONFIG.IMAGE_URL_API + supplement.image}
                                                    alt={supplement.name}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">{supplement.name}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <p>{supplement.price}Dt</p>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Fab variant="extended" color="inherit" onClick={onClose}>
                            <MuiIcons.CloseOutlined />
                            Cancel
                        </Fab>
                        <Fab variant="extended" color="error" onClick={placeOrderHandler}>
                            <MuiIcons.Menu />
                            Commander
                        </Fab>
                    </CardActions>
                </Card>
            </PaperStyle>
        </StyledModal>
    );
};
export default Order;