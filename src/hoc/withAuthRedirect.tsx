import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {AppStateType} from "../redux/redux-store";

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
});

type MapRropsType = {
  isAuth: boolean
}

type DispatchPropsType = {
}

export function withAuthRedirect<WCP>(WrapperComponent: React.ComponentType<WCP>) {
  function RedirectComponent(props: MapRropsType & DispatchPropsType) {
    let {isAuth, ...restProps} = props
    if (!props.isAuth) return <Redirect to='/login'/>;
    return (
      <WrapperComponent {...restProps as WCP}/>
    )
  }

  const ConnectAuthRedirectComponent = connect<MapRropsType, DispatchPropsType, WCP, AppStateType>(mapStateToProps, {})(RedirectComponent);

  return ConnectAuthRedirectComponent;

};


