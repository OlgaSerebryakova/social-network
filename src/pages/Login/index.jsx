import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {
  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <Field component={'input'} name={'login'} placeholder={"Login"}/>
        </div>
        <div>
          <Field component={'input'} name={'password'} placeholder={"Password"}/>
        </div>
        <div>
          <Field component={'input'} name={'rememberMe'} type={"checkbox"}/>remember me
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    )
  }
};

const ReduxLoginForm = reduxForm ({form: 'login'})(LoginForm);

export default class Login extends Component {

  onSubmit = (dataForm) => {
    
  };

  render() {
    return(
      <div>
        <h1>Login</h1>
        <ReduxLoginForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
};