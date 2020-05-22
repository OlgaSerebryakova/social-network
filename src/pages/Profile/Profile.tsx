import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import style from './Profile.module.css';
import {profileType} from "../../types/types";

type PropsType = {
  status: string,
  profile: profileType | null,
  updateStatus: (status: string) => void,
  isOwner: boolean,
  savePhoto: (file: File) => void,
  saveProfile:(profile: profileType) => Promise<any>
}

export default class Profile extends Component<PropsType, any> {

  render() {
    return(
      <div className={style.content}>
        <ProfileInfo isOwner={this.props.isOwner}
                     savePhoto={this.props.savePhoto}
                     profile={this.props.profile}
                     status={this.props.status}
                     saveProfile={this.props.saveProfile}
                     updateStatus={this.props.updateStatus}/>
        <MyPostsContainer />
      </div>
    )
  }
};

