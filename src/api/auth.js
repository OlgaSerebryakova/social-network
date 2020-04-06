import axiosFetch from "./axios";

export const getAuthMe = () => {
  return (
    axiosFetch.get(`auth/me`)
      .then(response => response.data)
  )
};
