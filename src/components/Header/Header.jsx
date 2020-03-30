import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.css'

const Header = (props) => {
  return(
    <header className={style.header}>
      <img src='https://yt3.ggpht.com/a/AGF-l796HOAqDj6_gTmzDusTkNuvoVoAsZp3UoMnXg=s900-c-k-c0xffffffff-no-rj-mo' alt=''/>
      <div className={style.loginBlock}>
        { props.isAuth
          ? props.login
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  )
};

export default Header;
