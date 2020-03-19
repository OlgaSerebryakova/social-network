import React, { Component } from 'react';
import style from './../style.module.css';

export default class Message extends Component {
  render() {
    return(
      <div className={style.message}>{this.props.message}</div>
    )
  }
};