// import React from 'react';
import { connect } from 'react-redux'
import MyPosts from "./MyPosts";
import { addPostActionCreator } from './../../../redux/profile_reducer';

const mapStateToProps = (state) => {
  return({
    profilePage: state.profilePage
  })
};

const mapDispatchToProps = (dispatch) => {
  return({
    addPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText))
    }
  })
};


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;