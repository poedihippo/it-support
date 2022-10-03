import React from 'react';
import Load from '../image/load.gif';

const IsLoading = () => {
    return (
        <img src={Load} alt="Loading" style={{display:"block", margin:"auto"}}/>
    )
}

export default IsLoading