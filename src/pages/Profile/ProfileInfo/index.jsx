import React, { Component } from 'react';
import style from './style.module.css'

export default class ProfileInfo extends Component {
  render() {
    return(
      <div>
        <div>
          <img src="https://cdn.beach-inspector.com/static/awards/lp-header.jpg?w=1200&h=400&fit=crop" alt="ocean"/>
        </div>
        <div className={style.descriptionBlock}>
          ava + description
        </div>
      </div>
    )
  }
};

