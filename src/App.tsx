import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";

import './App.css';
import HeaderContainer from './components/Header/HeaderContainer'; //

import ProfileContainer from './pages/Profile/ProfileContainer';
import DialogsContainer from './pages/Dialogs/DialogContainer';
import UsersContainer from './pages/Users/usersContainer';
import News from './pages/News';
import Music from './pages/Music';
import Settings from './pages/Settings';
import LoginPage from './pages/Login/index';
import { initializeAPP } from "./redux/app-reducer";
import Loading from "./assets/images/loading";
import {AppStateType} from "./redux/redux-store";
import Navbar from "./components/Navbar/Navbar";

type MapPropType = ReturnType<typeof mapStateToProps>
type DispatchPropType = {
  initializeAPP: () => void
}

class App extends Component<MapPropType & DispatchPropType, any> {

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
            <Switch>
            <Route path='/profile/:userId?' render={ () => <ProfileContainer/> }/>

            <Route path='/dialogs' render={ () => <DialogsContainer/> }/>

            <Route path='/users' render={ () => <UsersContainer/> }/>

            <Route path='/login' render={ () => <LoginPage/> }/>

            <Route path='/news' component={News}/>
            <Route path='/music' component={Music}/>
            <Route path='/settings' component={Settings}/>
            </Switch>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
});

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeAPP }))(App);




