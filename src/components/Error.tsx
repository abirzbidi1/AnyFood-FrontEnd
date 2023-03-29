import * as React from 'react';
import imageToAdd from '../assets/images/error2.png';
import { Div } from './Error.style';


const ErrorPage = () => {
    return (
        <Div>
            <img src={imageToAdd} alt='error page' />
        </Div>

    );
};

export default ErrorPage