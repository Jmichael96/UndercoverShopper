import React from 'react';
import RingLoader from 'react-spinners/RingLoader';

// utils
import Constants from '../../../utils/Constants';

const loaderStyles = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3rem'
};

const PageLoader = () => (<RingLoader color={Constants.PageSpinner} size={100} css={loaderStyles} />)

export default PageLoader;