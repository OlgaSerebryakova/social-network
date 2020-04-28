import axiosFetch from "./axios";

export const getAuthMe = () => {
  return (
    axiosFetch.get(`auth/me`)
  )
};

export const Login = (email, password, rememberMe = false, captcha = null) => {
  return (
    axiosFetch.post(`/auth/login`, { email, password, rememberMe, captcha })
  )
};

export const Logout = () => {
  return (
    axiosFetch.delete(`/auth/login`)
  )
};

export const getCaptcha = () => {
  return (
    axiosFetch.get(`security/get-captcha-url`)
  )
};