import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './style.module.css';
import userPhoto from './../../assets/images/user.jpg';

const Users = (props) =>  {

  let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i=1; i<=pageCount; i++) {
    pages.push(i)
  }

  return (
  <div>
    <div>
      {pages.map(page => {
        return (
          <span key={page}
                onClick={() => {props.onPageChanged(page)}}
                className={props.currentPage === page && style.selectedPage}>{page}</span>
        )
      })}
    </div>
    {props.users.map(u => <div key={u.id}>
        <span>
          <div>
            <NavLink to={'/profile/' + u.id}>
            <img src={ !u.photos.small ? userPhoto : u.photos.small} className={style.userPhoto} alt='photo'/>
            </NavLink>
          </div>
          <div>
            { u.followed
              ? <button disabled={props.followingInProc.some(id => id === u.id)}
                        onClick={ () => {props.unfollow(u.id)}}>
                Unfollow</button>

              : <button disabled={props.followingInProc.some(id => id === u.id)}
                        onClick={ () => {props.follow(u.id)}}>
                Follow</button>}
          </div>
        </span>
      <span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{'.location.country'}</div>
            <div>{'u.location.city'}</div>
          </span>

        </span>
    </div>)}
  </div>
  )
};

export default Users;

