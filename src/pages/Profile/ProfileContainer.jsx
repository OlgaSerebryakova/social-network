import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProfileByIdActionCreator, getStatusByIdActionCreator, updateStatusActionCreator } from './../../redux/profile_reducer';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import Profile from './Profile';


class ProfileContainer extends Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
    }
    this.props.getProfileByIdActionCreator(userId);
    this.props.getStatusByIdActionCreator(userId);
  }

  render() {

    return (
      <Profile {...this.props} profile={this.props.profile}
               status={this.props.status}
               updateStatus={this.props.updateStatusActionCreator}/>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});


export default compose(
  connect(mapStateToProps, { getProfileByIdActionCreator, getStatusByIdActionCreator, updateStatusActionCreator }),
  withRouter,
  withAuthRedirect,
)(ProfileContainer)