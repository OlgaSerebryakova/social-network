import React, { Component } from 'react';
import style from './style.module.css'
import Loading from "../../../assets/images/loading";
import ProfileStatus from './ProfileStatus';

export default class ProfileInfo extends Component {

  render() {
    return(
      <div>
        {!this.props.profile
        ? <Loading size={40}/>
        : <div>
            {/*<div>*/}
              {/*<img src="https://cdn.beach-inspector.com/static/awards/lp-header.jpg?w=1200&h=400&fit=crop" alt="ocean"/>*/}
            {/*</div>*/}
            <div className={style.descriptionBlock}>
              <img className={style.profileImg} src={this.props.profile.photos.large} alt='avatar'/>
              <ProfileStatus status={this.props.status} updateStatus={this.props.updateStatus}/>
              <div><span className={style.profileDescription}>В поисках работы: </span>{this.props.profile.lookingForAJob === true ? 'Да' : 'Нет' }</div>
              <div><span className={style.profileDescription}>Описание: </span>{this.props.profile.lookingForAJobDescription}</div>
              <div><span className={style.profileDescription}>Имя: </span>{this.props.profile.fullName}</div>
              <div><span className={style.profileDescription}>Контакты: </span>
                <div className={style.profileContacts}>
                  {this.props.profile.contacts.github ? <div>Github: {this.props.profile.contacts.github}</div> : ``}
                  {this.props.profile.contacts.vk ? <div>VK: {this.props.profile.contacts.vk}</div> : ''}
                  {this.props.profile.contacts.facebook ? <div>Facebook: {this.props.profile.contacts.facebook}</div> : ''}
                  {this.props.profile.contacts.twitter ? <div>Twitter: {this.props.profile.contacts.twitter}</div> : ''}
                  {this.props.profile.contacts.website ? <div>Website: {this.props.profile.contacts.website}</div> : ''}
                  {this.props.profile.contacts.youtube ? <div>Youtube: {this.props.profile.contacts.youtube}</div> : ''}
                  {this.props.profile.contacts.mainLink ? <div>MainLink: {this.props.profile.contacts.mainLink}</div> : ''}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
};

