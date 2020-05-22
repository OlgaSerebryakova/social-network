import React, { Component } from 'react';
import style from './../style.module.css';

type PropsType = {
  message: string
}

export default class Message extends Component<PropsType, any> {
  render() {
    return(
      <div className={style.message}>{this.props.message}</div>
    )
  }
};