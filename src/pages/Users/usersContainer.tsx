import React, {Component} from 'react';
import { connect } from 'react-redux';
import {follow, unfollow,
        setCurrentPage,
        getUsers} from "../../redux/users-reducer";
import Users from "./index";
import Loading from './../../assets/images/loading';
import * as userSelectors from '../../redux/users-selectors';
import {userType} from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type mapStatePropsType = {
  currentPage: number,
  pageSize: number,
  isFetching: boolean,
  totalUsersCount: number,
  users: Array<userType>,
  followingInProc: Array<number>
}

type mapDispatchPropsType = {
  unfollow: (userId: number) => void
  follow: (userId: number) => void
  getUsers: (currentPage: number, pageSize: number) => void
  setCurrentPage: (pageNumber: number) => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType;


class UsersContainer extends Component<PropsType> {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return <>
      {this.props.isFetching ? <Loading size={40} /> : null}
    <Users totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  unfollow={this.props.unfollow}
                  follow={this.props.follow}
                  users={this.props.users}
                  followingInProc={this.props.followingInProc}

    />
      </>
  }
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
  return {
    users: userSelectors.getUsers(state),
    pageSize: userSelectors.getPageSize(state),
    totalUsersCount: userSelectors.getTotalUsersCount(state),
    currentPage: userSelectors.getCurrentPage(state),
    isFetching: userSelectors.getIsFetching(state),
    followingInProc: userSelectors.getFollowingInProc(state)
  }
};

const mapDispatchToProps: mapDispatchPropsType = {
  follow,
  unfollow,
  setCurrentPage,
  getUsers
};

export default connect<mapStatePropsType, mapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(UsersContainer);

















