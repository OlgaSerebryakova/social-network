import React, { Component } from 'react';
import Redirect from "react-router-dom/es/Redirect";
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component) => {
  class RedirectComponent extends Component {
    render() {
      if (!this.props.isAuth) return <Redirect to='/login'/>;
      return (
        <Component {...this.props}/>
      )
    }
  }

  const ConnectAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);

  return ConnectAuthRedirectComponent;

};


