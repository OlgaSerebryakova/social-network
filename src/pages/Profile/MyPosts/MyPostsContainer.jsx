// import React from 'react';
import { connect } from 'react-redux'
import MyPosts from "./MyPosts";
import { addPostActionCreator, onPostChangeActionCreator } from './../../../redux/profile_reducer';

const mapStateToProps = (state) => {
  return({
    profilePage: state.profilePage
  })
};

const mapDispatchToProps = (dispatch) => {
  return({
    onPostChangeText: (text) => {
      dispatch(onPostChangeActionCreator(text))
    },
    addPost: () => {
      dispatch(addPostActionCreator())
    }
  })
};


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;