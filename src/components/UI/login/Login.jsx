import React from 'react';
import {useState, useEffect} from 'react';

const Login = (props) => {
    const CLIENT_ID = '88255752acaa4544a7f67320e6d057e3';
    const REDIRECT_URI = window.location.origin + '/'; 
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';

    useEffect(() => {
        const hash = window.location.hash; 
        let token = window.localStorage.getItem('token');
    
        if (!token && hash) { 
          
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]; 
    
            window.location.hash = ''; 
            window.localStorage.setItem('token', token); 
        }
        props.setToken(token); 
    }, [])
    
    const logout = () => {
        props.setToken('');
        window.localStorage.removeItem('token');
    }

    const login = () => {
        document.location=`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
    }

    return (
        <div>
            <h1>Spoti Music</h1>
            {!props.token 
            ? <button className="log" onClick={login}>Login</button>
            : <button className="log" onClick={logout}>Logout</button>
            }
        </div>
    );
};

export default Login;