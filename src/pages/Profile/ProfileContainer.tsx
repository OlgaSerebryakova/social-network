import React, {Component, ComponentType} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { getProfileByIdActionCreator, getStatusByIdActionCreator,
          updateStatusActionCreator, savePhotoAC, saveProfileAC} from '../../redux/profile_reducer';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import Profile from './Profile';
import {AppStateType} from "../../redux/redux-store";
import {profileType} from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getProfileByIdActionCreator: (userId: number) => void,
  getStatusByIdActionCreator: (userId: number) => void,
  updateStatusActionCreator: (status: string) => void,
  savePhotoAC: (file: File) => void,
  saveProfileAC: (profile: profileType) => Promise<any>
}

type PathParamsType = {
  userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends Component<PropsType, any> {

  refreshProfile = () => {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }

    if (!userId) {
      console.log('error')
    } else {
      this.props.getProfileByIdActionCreator(userId);
      this.props.getStatusByIdActionCreator(userId);
    }
  };

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps:PropsType, prevState: PropsType) {
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

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});


export default compose<ComponentType>(
  connect(mapStateToProps, { getProfileByIdActionCreator, getStatusByIdActionCreator,
    updateStatusActionCreator, savePhotoAC, saveProfileAC }),
  withRouter,
  withAuthRedirect,
)(ProfileContainer)