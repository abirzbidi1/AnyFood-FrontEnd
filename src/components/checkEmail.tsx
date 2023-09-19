import * as React from 'react';
import { Box, Grid, MenuItem, SvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import imageToAdd from '../assets/icons/email.png';
import { DivStyle, H3Style, ImgStyle, PaperStyle, SelectStyle } from './CheckEmail.style';
import { US, FR } from 'country-flag-icons/react/3x2';
import { Language } from '@mui/icons-material';
const checkEmail = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t, i18n } = useTranslation();
    const onClickLanguageChange = (e: any) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
    }
    return (
        <DivStyle>
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                <PaperStyle elevation={16}>
                    <Grid >
                        <ImgStyle src={imageToAdd} alt='Check your email' />
                        <H3Style>
                            {t("checkEmail.title")}
                        </H3Style>
                        <h4>
                            {t("checkEmail.body1")}
                        </h4>
                        <h5>
                            {t("checkEmail.body2")}
                        </h5>
                    </Grid>
                    <br />
            <SelectStyle defaultValue="" displayEmpty onChange={onClickLanguageChange}
                renderValue={(value) => {
                    return (
                        <Box>
                            <>
                                <SvgIcon >
                                    <Language />
                                </SvgIcon>
                                {value}
                            </>
                        </Box>
                    );
                }}>
                <MenuItem value='en'><US style={{ width: 20 }} />&nbsp; english</MenuItem>
                <MenuItem value='fr'><FR style={{ width: 20 }} /> &nbsp; french</MenuItem>
            </SelectStyle>
                </PaperStyle>
            </Grid>
        </DivStyle>
    );
};

export default checkEmail