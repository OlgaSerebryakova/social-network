import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar.jsx'
import Profile from './pages/Profile/Profile.jsx';
import Dialogs from './pages/Dialogs/index';
import News from './pages/News/index';
import Music from './pages/Music/index';
import Settings from './pages/Settings/index'


export default class App extends Component {

  render() {

    const { profilePage, messagePage } = this.props.state;

    return (
        <div className='app-wrapper'>
          <Header />
          <Navbar />
          <div className='wrapper-content'>
            <Route path='/profile' render={ () => <Profile
              profilePage={profilePage}
              dispatch={this.props.dispatch}/> }/>

            <Route path='/dialogs' render={ () => <Dialogs
              dialogData={messagePage.dialogData}
              messageData={messagePage.messageData}
              newMessageText={messagePage.newMessageText}
              dispatch={this.props.dispatch}/> }/>
            <Route path='/news' component={News}/>
            <Route path='/music' component={Music}/>
            <Route path='/settings' component={Settings}/>
          </div>
        </div>
    )
  }
};




