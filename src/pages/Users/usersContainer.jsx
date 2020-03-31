import React, {Component} from 'react';
import { connect } from 'react-redux';
import {follow, unfollow, setUsers, setCurrentPage, setUsersCount, toggleIsFetching} from "../../redux/users-reducer";
import API from './../../api/index';
import Users from "./index";
import Loading from './../../assets/images/loading';

class UsersContainer extends Component {

  componentDidMount() {
    this.props.toggleIsFetching(true);
    API.users.getUsers(this.props.currentPage, this.props.pageSize)
      .then(data => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
        this.props.setUsersCount(data.totalCount);
      });
  }

  onPageChanged = (pageNumber) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(pageNumber);
    API.users.getUsers(pageNumber, this.props.pageSize)
      .then(data => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items)
      });
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
    isFetching: state.usersPage.isFetching
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId))
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId))
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users))
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber))
//     },
//     setUsersCount: (totalCount) => {
//       dispatch(setUsersCountAC(totalCount))
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingAC(isFetching))
//     }
//   }
// };

export default connect(mapStateToProps,
  {follow, unfollow, setUsers, setCurrentPage, setUsersCount, toggleIsFetching})(UsersContainer);