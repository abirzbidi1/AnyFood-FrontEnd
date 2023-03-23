import * as React from 'react';
import imageToAdd from '../assets/images/error2.png';


const ErrorPage = () => {
    return (
        <div  style={{  position: 'absolute',left:'50%', transform: 'translate(-50%,0%)'}}>
            <img src={imageToAdd} alt='error page' />
        </div>

    );
};

export default ErrorPage