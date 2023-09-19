import { useState } from "react";
import { useParams } from 'react-router-dom';
import * as MuiIcons from '@material-ui/icons';
import ErrorPage from "../../../../components/Error";
import { ContainerGrid } from "../../homePage/home.style";
import { CONFIG } from "../../../../config/constant/config";
import { IItem, ISection } from "../../../../types/interfaces/menuInterface";
import { useShowRestaurantQuery } from "../../../../redux/api/restaurant/restoApi";
import { CardContentStyle, ImageStyle, StyledCard, StyledCardSection } from "./menu.style";
import { useGetAllItemsQuery, useListingSectionsQuery, useShowMenuQuery } from "../../../../redux/api/menu/menuApi";
import { Box, CardContent, CircularProgress, Fab, Grid, Paper, Stack, Table, TableBody, TableCell, TableRow } from "@mui/material";
import Order from "./order/order";

function Menu() {
    const { id } = useParams<{ id: string }>();
    const { data: menu, isLoading, isError } = useShowMenuQuery(id);
    const { data: section } = useListingSectionsQuery(menu?.id as number);
    const [sectionID, setSectionID] = useState(0);
    const { data: items } = useGetAllItemsQuery(sectionID);
    const { data: restaurant } = useShowRestaurantQuery(id);
    const [isCardOpen, setCardOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idT, setId] = useState(0);
    const [itemSelected, setItemSelected] = useState<IItem>();
    const handleOpenModal = (item: IItem, idSection: number) => {
        setId(idSection);
        setItemSelected(item)
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const toggleCard = (index: number, sectionId: number) => {
        setSelectedCard(index === selectedCard ? null : index);
        setSectionID(sectionId);
        setCardOpen(true);
    };
    return (
        <Stack marginTop={'3%'} width={'100%'} height={'100%'}>
            <CardContent >
                <Paper sx={{ marginTop: 2 }}>
                    {restaurant && (
                        <StyledCard>
                            <CardContentStyle>
                                <Table>
                                    <TableBody sx={{ alignSelf: 'right', padding: 0 }}>
                                        <TableRow style={{ borderBottom: "none" }}>
                                            <TableCell align="left" style={{ width: '70px', borderBottom: "none", padding: "0px 0px 0px 16px" }}> <ImageStyle src={CONFIG.IMAGE_URL_API + restaurant.logo} alt={restaurant.name} /> </TableCell>
                                            <TableCell align="left" style={{ borderBottom: "none", padding: "0px 0px 0px 16px", textTransform: 'capitalize', color: "white" }}><h1> {restaurant.name}</h1> </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContentStyle>
                        </StyledCard>
                    )}
                    <Box sx={{ flexGrow: 1, mt: 2 }}>
                        {isLoading && <Stack spacing={2} direction="row" marginLeft={'30%'}>
                            <CircularProgress color="error" />
                            <CircularProgress color="error" />
                            <CircularProgress color="error" />
                        </Stack>}
                        {isError && <ErrorPage />}
                        {menu && (
                            <Box sx={{ flexGrow: 1 }}>
                                <ContainerGrid container spacing={2}>
                                    {section && section.map((section: ISection, index: number) => (
                                        <Grid item xs={12} sm={6} md={3} lg={2} key={index} >
                                            <StyledCardSection onClick={() => toggleCard(index, section.id)}
                                                sx={{ maxWidth: 120, minWidth: 120, maxHeight: 120, backgroundColor: selectedCard === index ? '#FFCB06' : '#FFFFC3' }}>
                                                <img src={CONFIG.IMAGE_URL_API + section.image} alt="Restaurant" style={{ width: 65, height: 65, borderRadius: 50 }} />
                                                <h3 style={{ color: selectedCard === index ? 'white' : 'black' }}>{section.name}</h3>
                                            </StyledCardSection>
                                        </Grid>
                                    ))}
                                </ContainerGrid>
                            </Box>
                        )}
                    </Box>
                    <br />
                    {isCardOpen && (
                        <Box sx={{ flexGrow: 1 }}>
                            <ContainerGrid container spacing={2}>
                                {items && items.map((item: IItem, index: number) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                                        <Stack sx={{ marginTop: '13%' }}>
                                            <CardContent style={{ width: '190px', minHeight: '250px', maxHeight: '250px', backgroundColor: '#FFFFC3', borderRadius: 30, position: 'relative', paddingTop: '25%' }} >
                                                <h4> {item.name}</h4>
                                                <hr />
                                                <h5> {item.description}</h5>
                                                <hr />
                                                <h5> {item.price}Dt</h5>
                                                <Stack>
                                                    <Fab variant="extended" color="success" onClick={() => handleOpenModal(item, item.section_id)}>
                                                        <MuiIcons.Add />Commander
                                                    </Fab>
                                                </Stack>
                                            </CardContent>
                                            <img
                                                src={CONFIG.IMAGE_URL_API + item.image}
                                                alt={item.name}
                                                style={{
                                                    top: -380,
                                                    borderRadius: 80,
                                                    width: '120px',
                                                    height: '120px',
                                                    left: '18%',
                                                    position: 'relative',
                                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                                                }}
                                            />

                                        </Stack>
                                    </Grid>
                                ))}
                            </ContainerGrid>
                        </Box>
                    )}
                </Paper>
            </CardContent >
            <Order id={idT} item={itemSelected} open={isModalOpen} onClose={handleCloseModal} />
        </Stack >
    );
}
export default Menu;