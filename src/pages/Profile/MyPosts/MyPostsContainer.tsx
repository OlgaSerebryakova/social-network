import React from 'react';
import { connect } from 'react-redux'
import MyPosts, {DispatchPropsType} from "./MyPosts";
import { actions } from '../../../redux/profile_reducer';
import {AppStateType} from "../../../redux/redux-store";
import { MapPropsType } from './MyPosts';

const mapStateToProps = (state: AppStateType) => {
  return {
    postData: state.profilePage.postData
  }
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator})(MyPosts);

export default MyPostsContainer;