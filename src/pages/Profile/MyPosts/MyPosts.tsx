import React, { Component } from 'react';
import Post from './Post/Post'
import style from './MyPosts.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { required, maxLengthCreator } from '../../../utils/validators';
import {creatorFields, Input, Textarea} from '../../../components/FormsControls';
import {postDataType} from "../../../types/types";

const maxLength10 = maxLengthCreator(10);

export type MapPropsType = {
  postData: Array<postDataType>
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

export default class MyPosts extends Component<MapPropsType & DispatchPropsType, {}> {

  renderPost = (post: postDataType) => {
    return(
      <Post message={post.message} likeCounter={post.likeCounter} key={post.id}/>
    );
  };

  addNewPost = (values: AddPostFormValueType) => {
    this.props.addPost(values.newPostText);
  };

  render() {
    const { postData } = this.props;

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

// Компонент добавления постов

type PropsFormType = {}

type AddPostFormValueType = {
  newPostText: string
}
type AddPostFormValueKeysType = keyof AddPostFormValueType

const PostForm: React.FC<InjectedFormProps<AddPostFormValueType, PropsFormType> & PropsFormType> = (props) => {
    return(
      <form onSubmit={props.handleSubmit}>
        <div>
          {creatorFields<AddPostFormValueKeysType>(Textarea, 'newPostText', "Введите текст", [required, maxLength10])}
        </div>
        <div>
          <button>Добавить пост</button>
        </div>
      </form>
    )
}

const PostFormRedux = reduxForm<AddPostFormValueType, PropsFormType>({form: 'AddPostForm'})(PostForm);
