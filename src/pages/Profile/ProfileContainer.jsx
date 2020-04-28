import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProfileByIdActionCreator, getStatusByIdActionCreator,
          updateStatusActionCreator, savePhotoAC, saveProfileAC} from './../../redux/profile_reducer';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import Profile from './Profile';


class ProfileContainer extends Component {

  refreshProfile = () => {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getProfileByIdActionCreator(userId);
    this.props.getStatusByIdActionCreator(userId);
  };

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }

  }

  render() {

    return (
      <Profile {...this.props}
               isOwner={!this.props.match.params.userId}
               profile={this.props.profile}
               status={this.props.status}
               updateStatus={this.props.updateStatusActionCreator}
               saveProfile={this.props.saveProfileAC}
               savePhoto={this.props.savePhotoAC}/>
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
  connect(mapStateToProps, { getProfileByIdActionCreator, getStatusByIdActionCreator,
    updateStatusActionCreator, savePhotoAC, saveProfileAC }),
  withRouter,
  withAuthRedirect,
)(ProfileContainer)