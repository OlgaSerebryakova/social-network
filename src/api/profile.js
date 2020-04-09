import axiosFetch from "./axios";

export const getProfileById = (userId) => {
  return (
    axiosFetch.get(`profile/${userId}`)
  )
};

export const getStatus = (userId) => {
  return (
    axiosFetch.get(`profile/status/${userId}`)
  )
};

export const updateStatus = (status) => {
  return (
    axiosFetch.put(`profile/status`, { status: status })
  )
};