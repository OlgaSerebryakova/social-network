import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Input } from  './../../components/FormsControls/index';
import {required} from "../../utils/validators";
import { connect } from 'react-redux';
import { LoginActionCreator } from './../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from './../../components/FormsControls/style.module.css';
import {creatorFields} from "../../components/FormsControls";

class LoginForm extends Component {
  render() {
    const {handleSubmit, error} = this.props;
    return(
      <form onSubmit={handleSubmit}>
        {creatorFields(Input, 'email', "Email", [required] )}
        {creatorFields(Input, 'password', "Password", [required], {type: 'password'} )}
        {creatorFields(Input, 'rememberMe', null, [], {type: 'checkbox'}, "remember me"  )}
        <div>
          {error && <div className={style.formSummaryError}>{error}</div>}
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    )
  }
}

const LoginFormRedux = reduxForm({ form: 'login' })(LoginForm);

class Login extends Component {

  onSubmit = (dataForm) => {
    this.props.LoginActionCreator(dataForm.email, dataForm.password, dataForm.rememberMe)
  };

  render() {

    if (this.props.isAuth) {
      return <Redirect to={'/profile'} />
    }

    return(
      <div>
        <h1>Login</h1>
        <LoginFormRedux onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { LoginActionCreator })(Login)