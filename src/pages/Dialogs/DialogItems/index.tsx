import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import style from './../style.module.css';

type PropsType = {
  id: number,
  name: string
}


export default class DialogItem extends Component<PropsType, any> {

  render(){
    let path='/dialogs/' + this.props.id;

    return(
      <div className={style.dialog + ' ' + style.active}>
        <NavLink to={path} activeClassName={style.active}>{this.props.name}</NavLink>
      </div>
    )
  }
};

