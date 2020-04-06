import axiosFetch from "./axios";

export const postFollow = (id) => {
  return axiosFetch.post(`follow/${id}`)
    .then(response => response.data)
};

export const deleteUnfolow = (id) => {
  return axiosFetch.delete(`follow/${id}`)
    .then(response => response.data)
};