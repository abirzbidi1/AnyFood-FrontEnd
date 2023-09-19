import { ChangeEvent, useState } from 'react';
import * as MuiIcons from '@material-ui/icons';
import ErrorPage from '../../../components/Error';
import { useTranslation } from 'react-i18next';
import LoadingPage from '../../../components/Loading';
import { CONFIG } from '../../../config/constant/config';
import { IRestaurant } from '../../../types/interfaces/restoInterface';
import { useGetRestaurantsListQuery } from "../../../redux/api/restaurant/restoApi";
import { BoxStyle, ContainerCardContent, ContainerGrid, InputBaseStyle, PaperStyle, TypographyStyle, StyledCard, CardMediaStyle } from './home.style';
import { CardActions,  Typography, CardHeader, Box, Grid, InputAdornment, CardContent, Stack } from '@mui/material';
import RestaurantModal from '../restaurantModal/Restaurant';
import RatingForm from '../RatingRestaurant/ratingRestaurant';

const Home = () => {
    const [searched, setSearched] = useState("");
    const [perPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const { t } = useTranslation();
    const [orderColumn, setOrderColumn] = useState('created_at');
    const [orderType, setOrderType] = useState('desc');
    const { data, isError, isLoading, isSuccess } = useGetRestaurantsListQuery({ page, perPage, searched, orderColumn, orderType });
    const [isHovered, setIsHovered] = useState(false);
    const [id, setId] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = (idRestaurant: number) => {
        setId(idRestaurant);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    if (isLoading) {
        return <LoadingPage />;
    }
    if (isError) {
        return <ErrorPage />;
    }
    if (isSuccess) {
        return (
            <Stack marginTop={'5%'} width={'100%'}>
                <CardContent >
                    <PaperStyle >
                        <BoxStyle>
                            <MuiIcons.Home style={{ fontSize: '45px', color: '#404040' }} />
                            <TypographyStyle>
                                &nbsp;{t("home.title")}
                            </TypographyStyle>
                            <InputBaseStyle autoFocus placeholder="Search" value={searched}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <MuiIcons.Search />
                                    </InputAdornment>
                                }
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearched(event.target.value)} />
                        </BoxStyle>
                        <Box sx={{ flexGrow: 1, mt: 6 }}>
                            <ContainerGrid container spacing={2}>
                                {data.length > 0 && data.map((restaurant: IRestaurant, index: number) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <StyledCard sx={{ maxWidth: 250, minWidth: 250, border: 1, borderColor: '#FFD700', borderRadius: 8, backgroundColor: '#FFFFC3' }}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}>
                                            <CardHeader title={restaurant.name} sx={{ backgroundColor: '#be1222', color: 'white' }} onClick={() => handleOpenModal(restaurant.id ?? -1)}/>
                                            <CardMediaStyle image={CONFIG.IMAGE_URL_API + restaurant.logo} onClick={() => handleOpenModal(restaurant.id ?? -1)}/>
                                            <ContainerCardContent 
                                            onClick={() => handleOpenModal(restaurant.id ?? -1)}>
                                                <Typography variant="body2">
                                                    {restaurant.description}
                                                </Typography>
                                            </ContainerCardContent>
                                            <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
                                                <RatingForm restaurantId={restaurant.id} />
                                            </CardActions>
                                        </StyledCard>
                                    </Grid>
                                ))}
                            </ContainerGrid>
                        </Box>
                    </PaperStyle>
                </CardContent>
                <RestaurantModal id={id} open={isModalOpen} onClose={handleCloseModal} />
            </Stack>
        );
    } else return null;
}
export default Home;