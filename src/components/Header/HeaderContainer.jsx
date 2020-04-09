import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "./Header";
import { getAuthMeActionCreator, LogoutActionCreator } from './../../redux/auth-reducer';

class HeaderContainer extends Component {

  render() {
    return (
      <Header {...this.props}/>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { getAuthMeActionCreator, LogoutActionCreator })(HeaderContainer);

