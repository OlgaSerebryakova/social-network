import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar.jsx'
import ProfileContainer from './pages/Profile/ProfileContainer';
import DialogsContainer from './pages/Dialogs/DialogContainer';
import UsersContainer from './pages/Users/usersContainer';
import News from './pages/News/index';
import Music from './pages/Music/index';
import Settings from './pages/Settings/index';
import LoginPage from './pages/Login/index';
import connect from "react-redux/es/connect/connect";
import { initializeAPP } from "./redux/app-reducer";
import Loading from "./assets/images/loading";



class App extends Component {

  componentDidMount() {
    this.props.initializeAPP();
  }

  render() {
    if (!this.props.initialized) {
      return <Loading size={50}/>
    }

    return (
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className='wrapper-content'>
            <Route path='/profile/:userId?' render={ () => <ProfileContainer
              store={this.props.store}/> }/>

            <Route path='/dialogs' render={ () => <DialogsContainer
            store={this.props.store}/> }/>

            <Route path='/users' render={ () => <UsersContainer
              store={this.props.store}/> }/>

            <Route path='/login' render={ () => <LoginPage
              store={this.props.store}/> }/>

            <Route path='/news' component={News}/>
            <Route path='/music' component={Music}/>
            <Route path='/settings' component={Settings}/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeAPP }))(App);




