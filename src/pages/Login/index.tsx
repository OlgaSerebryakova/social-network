import React, { Component } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../../components/FormsControls';
import {required} from "../../utils/validators";
import { connect } from 'react-redux';
import { LoginActionCreator } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from './../../components/FormsControls/style.module.css';
import { creatorFields } from "../../components/FormsControls";
import s from './style.module.css';
import {AppStateType} from "../../redux/redux-store";

type TloginOwnProps = {
  captchaUrl: string | null
}

class LoginForm extends Component<InjectedFormProps<TloginFormValues> & TloginOwnProps, any> {

  render() {
    const { handleSubmit, error, captchaUrl } = this.props;

    return(
      <form onSubmit={handleSubmit}>
        {creatorFields<TloginFormValuesKeys>(Input, 'email', "Email", [required] )}
        {creatorFields<TloginFormValuesKeys>(Input, 'password', "Password", [required], {type: 'password'} )}
        {creatorFields<TloginFormValuesKeys>(Input, 'rememberMe', undefined, [], {type: 'checkbox'}, "remember me"  )}

        { captchaUrl && <img className={s.captchaImg} src={captchaUrl} /> }
        { captchaUrl && creatorFields<TloginFormValuesKeys>(Input, 'captcha', 'Symbol from image', [required] ) }

      <div>
        { error && <div className={style.formSummaryError}>{error}</div>}
      </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    )
  }
}

const LoginFormRedux = reduxForm<TloginFormValues, TloginOwnProps>({ form: 'signin' })(LoginForm);

type TmapStateToProps = {
  captchaUrl: string | null
  isAuth: boolean
}

type TmapDispatchToProps = {
  LoginActionCreator: (email: string, password: string, rememberMe: boolean, captcha: any) => void
}

type TloginFormValues = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type TloginFormValuesKeys = keyof TloginFormValues

class Login extends Component<TmapStateToProps & TmapDispatchToProps> {

  onSubmit = (dataForm: TloginFormValues) => {
    this.props.LoginActionCreator(dataForm.email, dataForm.password, dataForm.rememberMe, dataForm.captcha)
  };

  render() {

    if (this.props.isAuth) {
      return <Redirect to={'/profile'} />
    }

    return(
      <div>
        <h1>Login</h1>
        <LoginFormRedux onSubmit={this.onSubmit} captchaUrl={this.props.captchaUrl}/>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType): TmapStateToProps => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { LoginActionCreator })(Login)