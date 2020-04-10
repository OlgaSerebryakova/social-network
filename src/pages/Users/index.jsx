import React from 'react';
import Paginator from '../../components/Paginator/Paginator';
import User from "../../components/User";

const Users = (props) =>  {
  return (
  <div>
    <Paginator currentPage={props.currentPage}
               totalUsersCount={props.totalUsersCount}
               pageSize={props.pageSize}
               onPageChanged={props.onPageChanged}/>
    <div>
      {
        props.users.map(u => <User key={u.id}
                                   user={u}
                                   followingInProc={props.followingInProc}
                                   unfollow={props.unfollow}
                                   follow={props.follow}/>
        )
      }
    </div>
  </div>
  )
};

export default Users;


