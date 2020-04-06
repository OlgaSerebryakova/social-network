import React, {Component} from 'react';
import { connect } from 'react-redux';
import {follow, unfollow, setUsers,
        setCurrentPage, setUsersCount,
        getUsers} from "../../redux/users-reducer";
import Users from "./index";
import Loading from './../../assets/images/loading';

class UsersContainer extends Component {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
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

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProc: state.usersPage.followingInProc
  }
};

export default connect(mapStateToProps,
  {follow, unfollow, setUsers,
    setCurrentPage, setUsersCount,
    getUsers})(UsersContainer);