import axiosFetch from "./axios";

export const getAuthMe = () => {
  return (
    axiosFetch.get(`auth/me`)
      .then(response => response.data)
  )
};

export const postAuthLogin = (dataForm) => {
  return (
    axiosFetch.get(`/auth/login`, { dataForm })
  )
};