import React from 'react';
import Paginator from '../../components/Paginator/Paginator';
import User from "../../components/User/index";
import {userType} from "../../types/types";

type PropsType = {
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (pageNumber: number) => void,
  users: Array<userType>,
  followingInProc: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, followingInProc, unfollow, follow }) =>  {
  return (
  <div>
    <Paginator currentPage={currentPage}
               totalItemsCount={totalUsersCount}
               pageSize={pageSize}
               onPageChanged={onPageChanged}/>
    <div>
      {
        users.map(u => <User key={u.id}
                                   user={u}
                                   followingInProc={followingInProc}
                                   unfollow={unfollow}
                                   follow={follow}/>
        )
      }
    </div>
  </div>
  )
};

export default Users;


