import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from  './../../components/FormsControls/index';
import {required} from "../../utils/validators";
import { connect } from 'react-redux';
import { LoginActionCreator } from './../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from './../../components/FormsControls/style.module.css';

class LoginForm extends Component {
  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <Field component={Input} name={'email'} placeholder={"Email"}
                 validate={[required]}/>
        </div>
        <div>
          <Field component={Input} name={'password'} placeholder={"Password"}
                 type='password' validate={[required]}/>
        </div>
        <div>
          <Field component={Input} name={'rememberMe'} type={"checkbox"}/>remember me
        </div>
        <div>
          {this.props.error && <div className={style.formSummaryError}>{this.props.error}</div>}
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