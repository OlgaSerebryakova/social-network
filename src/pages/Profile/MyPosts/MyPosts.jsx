import React, { Component } from 'react';
import Post from './Post/Post'
import style from './MyPosts.module.css';


export default class MyPosts extends Component {
  newPostElement = React.createRef();

  renderPost = (post) => {
    return(
      <Post message={post.message} likeCounter={post.likeCounter} key={post.id}/>
    );
  };

  onAddPost = () => {
    this.props.addPost();
  };

  onPostChange = () => {
    let text = this.newPostElement.current.value;
    this.props.onPostChangeText(text);
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
            <button onClick={ this.onAddPost }>Add post</button>
          </div>
        </div>
        <div>
          {postData.map(this.renderPost)}
        </div>
      </div>
    )
  }
};
