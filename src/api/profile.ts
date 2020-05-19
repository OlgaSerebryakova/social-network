import axiosFetch from "./axios";
import { profileType } from "../types/types";

export const getProfileById = (userId: number) => {
  return (
    axiosFetch.get(`profile/${userId}`)
  )
};

export const getStatus = (userId: number) => {
  return (
    axiosFetch.get(`profile/status/${userId}`)
  )
};

export const updateStatus = (status: string) => {
  return (
    axiosFetch.put(`profile/status`, { status: status })
  )
};

export const savePhoto = (photoFile: any) => {
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

export const saveProfile = (profile: profileType) => {
  return (
    axiosFetch.put(`profile`, profile )
  )
};

