import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo/index';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import style from './Profile.module.css';

export default class Profile extends Component {

  render() {
    return(
      <div className={style.content}>
        <ProfileInfo profile={this.props.profile}/>
        <MyPostsContainer store={this.props.store}/>
      </div>
    )
  }
};

