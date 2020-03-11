import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import notFound from './pages.module.scss';

const NotFound = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
   const userData = JSON.parse(localStorage.getItem('user'));
   
   if(userData) {
    setUser(userData);
   }
  },[])

  return(
    <div className={notFound.textCenter}>
      <h2>404 Not Found</h2>
      {
        user && <NavLink to="/">Go to contacts</NavLink>
      }
      
    </div>
  )
}

export default NotFound;