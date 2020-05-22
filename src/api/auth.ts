import axiosFetch, {ResultCodeForCapcthaEnum, ResultCodesEnum, TResponse} from './axios';

type TResponseGetAuthMe = {
    id: number
    email: string
    login: string
}

type TResponseLogin = {
    userId: number
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
    axiosFetch.get<TResponse<TResponseGetAuthMe>>(`auth/me`)
  )
};

export const Login = (email: string, password: string, rememberMe = false, captcha: null | string = null) => {
  return (
    axiosFetch.post<TResponse<TResponseLogin, ResultCodesEnum | ResultCodeForCapcthaEnum >>(`/auth/login`,
      { email, password, rememberMe, captcha })
  )
};

export const Logout = () => {
  return (
    axiosFetch.delete<TResponseLogout>(`/auth/login`)
  )
};

export const getCaptcha = () => {
  return (
    axiosFetch.get<TResponseGetCaptcha>(`security/get-captcha-url`).then(response => response.data)
  )
};