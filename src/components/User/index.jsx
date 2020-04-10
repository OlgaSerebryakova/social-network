import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './style.module.css';
import Photo from './../../assets/images/user.jpg';


const User = ({ user, followingInProc, unfollow, follow }) =>  {
  return (
    <div>
        <span>
          <div>
            <NavLink to={'/profile/' + user.id}>
            <img src={ user.photos.small != null ? user.photos.small : Photo} className={style.userPhoto} alt='avatar'/>
            </NavLink>
          </div>
          <div>
            { user.followed
              ? <button disabled={followingInProc.some(id => id === user.id)}
                        onClick={ () => {unfollow(user.id)}}>
                Unfollow</button>

              : <button disabled={followingInProc.some(id => id === user.id)}
                        onClick={ () => {follow(user.id)}}>
                Follow</button>}
          </div>
        </span>
        <span>
          <span>
            <div>{user.name}</div>
            <div>{user.status}</div>
          </span>
          <span>
            <div>{'user.location.country'}</div>
            <div>{'user.location.city'}</div>
          </span>
        </span>
    </div>
  )
};

export default User;