import React from 'react';
import './App.scss';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Search from './components/UI/search/Search';
import Login from './components/UI/login/Login';


function App(props) {
  const [token, setToken] = useState('');

  return (
    <div className='App'>
      <Login token={token} setToken={setToken}/>
      <Search token={token}/>
    </div>
  );
}

export default App;