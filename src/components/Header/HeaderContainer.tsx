import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header, {DispatchPropsType, MapPropsType} from "./Header";
import { getAuthMeActionCreator, LogoutActionCreator } from '../../redux/auth-reducer';
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends Component<MapPropsType & DispatchPropsType, any> {

  render() {
    return (
      <Header {...this.props}/>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps,
  { LogoutActionCreator })(HeaderContainer);

