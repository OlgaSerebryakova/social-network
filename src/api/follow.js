import axiosFetch from "./axios";

export const postFollow = (id) => {
  return axiosFetch.post(`follow/${id}`)
};

export const deleteUnfolow = (id) => {
  return axiosFetch.delete(`follow/${id}`)
};