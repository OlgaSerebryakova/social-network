import axiosFetch from './axios';

type TResponseGetAuthMe = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: number
  messages: Array<string>
}

type TResponseLogin = {
  data: {
    userId: number
  }
  resultCode: number
  messages: Array<string>
}

type TResponseLogout = {
  resultCode: number
  messages: Array<string>
  data: Object
}

type TResponseGetCaptcha = {
  url: string
}

export const getAuthMe = () => {
  return (
    axiosFetch.get<TResponseGetAuthMe>(`auth/me`)
  )
};

export const Login = (email: string, password: string, rememberMe = false, captcha: null | string = null) => {
  return (
    axiosFetch.post<TResponseLogin>(`/auth/login`, { email, password, rememberMe, captcha })
  )
};

export const Logout = () => {
  return (
    axiosFetch.delete<TResponseLogout>(`/auth/login`)
  )
};

export const getCaptcha = () => {
  return (
    axiosFetch.get<TResponseGetCaptcha>(`security/get-captcha-url`)
  )
};