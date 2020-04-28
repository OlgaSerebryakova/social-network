import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo/index';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import style from './Profile.module.css';

export default class Profile extends Component {

  render() {
    return(
      <div className={style.content}>
        <ProfileInfo isOwner={this.props.isOwner}
                     savePhoto={this.props.savePhoto}
                     profile={this.props.profile}
                     status={this.props.status}
                     saveProfile={this.props.saveProfile}
                     updateStatus={this.props.updateStatus}/>
        <MyPostsContainer store={this.props.store}/>
      </div>
    )
  }
};

