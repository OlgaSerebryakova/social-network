import React, { Component } from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/index'
import style from './Profile.module.css'

export default class Profile extends Component {
  render() {
    return(
      <div className={style.content}>
        <ProfileInfo />
        <MyPosts profilePage={this.props.profilePage}
                 dispatch={this.props.dispatch}/>
      </div>
    )
  }
};

