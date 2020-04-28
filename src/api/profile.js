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

export const savePhoto = (photoFile) => {
  const formData = new FormData();
  formData.append('image', photoFile);
  return (
    axiosFetch.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  )
};

export const saveProfile = (profile) => {
  return (
    axiosFetch.put(`profile`, profile )
  )
};

