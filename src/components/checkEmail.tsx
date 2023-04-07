import { Grid } from '@mui/material';
import * as React from 'react';
import imageToAdd from '../assets/images/check.jpg';
import { DivItemStyle, DivStyle, H3Style, ImgStyle, PaperStyle } from './CheckEmail.style';


const checkEmail = () => {
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
                            Check your email
                        </H3Style>
                        <h4>
                            If you have a <strong> AnyFood</strong> account,
                            you should have already received an email from us.
                        </h4>
                        <h5>
                            If you haven't received this email within a few minutes,
                            please check your spam folder or contact the responsible
                        </h5>
                    </Grid>
                </PaperStyle>
            </Grid>
        </DivStyle>
    );
};

export default checkEmail