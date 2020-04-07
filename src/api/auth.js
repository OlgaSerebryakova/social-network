import axiosFetch from "./axios";

export const getAuthMe = () => {
  return (
    axiosFetch.get(`auth/me`)
      .then(response => response.data)
  )
};

export const Login = (email, password, rememberMe = false) => {
  return (
    axiosFetch.post(`/auth/login`, { email, password, rememberMe })
  )
};

export const Logout = () => {
  return (
    axiosFetch.delete(`/auth/login`)
  )
};