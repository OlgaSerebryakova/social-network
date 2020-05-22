import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.css'

export type MapPropsType = {
  isAuth: boolean,
  login: string | null,
}

export type DispatchPropsType = {
  LogoutActionCreator: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return(
    <header className={style.header}>
      <img src='https://yt3.ggpht.com/a/AGF-l796HOAqDj6_gTmzDusTkNuvoVoAsZp3UoMnXg=s900-c-k-c0xffffffff-no-rj-mo' alt=''/>
      <div className={style.loginBlock}>
        { props.isAuth
          ? <div>{props.login} - <button onClick={props.LogoutActionCreator}>Log out</button></div>
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  )
};

export default Header;
