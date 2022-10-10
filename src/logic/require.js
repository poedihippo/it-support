import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';

const RequireAuth = (props) => {
    const authService = AuthenticationService.getLocalCredential()

    return (
        <>
            {
                authService.token !== "" && authService.token !== undefined && authService.token !== null
                ? props.children
                : window.location.assign('https://sunsafe.suneducationgroup.com/login')
            }
        </>
    )
}

export default RequireAuth