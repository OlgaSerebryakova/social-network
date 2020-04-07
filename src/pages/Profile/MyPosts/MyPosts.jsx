import React, { Component } from 'react';
import Post from './Post/Post'
import style from './MyPosts.module.css';
import { Field, reduxForm } from "redux-form";


export default class MyPosts extends Component {

  renderPost = (post) => {
    return(
      <Post message={post.message} likeCounter={post.likeCounter} key={post.id}/>
    );
  };

  addNewPost = (values) => {
    this.props.addPost(values.newPostText);
  };

  render() {
    const { postData } = this.props.profilePage;

    return(
      <div className={style.post}>
        <h3>My post</h3>
        <div>
          <PostFormRedux onSubmit={this.addNewPost} />
        </div>
        <div>
          {postData.map(this.renderPost)}
        </div>
      </div>
    )
  }
};


class PostForm extends Component {
  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <Field component={'input'} name={'newPostText'}/>
        </div>
        <div>
          <button>Добавить пост</button>
        </div>
      </form>
    )
  }
}

const PostFormRedux = reduxForm({form: 'AddPostForm'})(PostForm);
