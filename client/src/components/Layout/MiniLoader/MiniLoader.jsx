import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

// utils 
import Constants from '../../../utils/Constants';


const MiniLoader = () => (<ClipLoader color={Constants.BasicSpinner} css={loaderStyles} size={20} />);

const loaderStyles = {
    display: 'flex',
    justifyContent: 'center',
};

export default MiniLoader;