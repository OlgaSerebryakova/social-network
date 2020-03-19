import React, { Component } from 'react';
import Post from './Post/Post'
import style from './MyPosts.module.css';
import { addPostActionCreator, onPostChangeActionCreator } from './../../../redux/state'

export default class MyPosts extends Component {
  newPostElement = React.createRef();

  renderPost = (post) => {
    return(
      <Post message={post.message} likeCounter={post.likeCounter} key={post.id}/>
    );
  };

  addPost = () => {
    this.props.dispatch(addPostActionCreator());
  };

  onPostChange = () => {
    let text = this.newPostElement.current.value;
    let action = onPostChangeActionCreator(text);
    this.props.dispatch(action);
  };

  render() {
    const { postData, newPostText } = this.props.profilePage;

    return(
      <div className={style.post}>
        <h3>My post</h3>
        <div>
          <div>
            <input ref={this.newPostElement} onChange={this.onPostChange} value={newPostText}/>
          </div>
          <div>
            <button onClick={ this.addPost }>Add post</button>
          </div>
        </div>
        <div>
          {postData.map(this.renderPost)}
        </div>
      </div>
    )
  }
};
