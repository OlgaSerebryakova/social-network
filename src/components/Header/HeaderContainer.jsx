import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "./Header";
import { getAuthMeActioCreator } from './../../redux/auth-reducer';

class HeaderContainer extends Component {

  componentDidMount() {
    this.props.getAuthMeActioCreator();
  }

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

export default connect(mapStateToProps, { getAuthMeActioCreator })(HeaderContainer);

