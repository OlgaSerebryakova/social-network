import axiosFetch, {TResponse} from "./axios";
import { photosType, profileType } from "../types/types";

type TSavePhotoResponse = {
  photos: photosType
}

export const getProfileById = (userId: number) => {
  return (
    axiosFetch.get<profileType>(`profile/${userId}`).then(response => response.data)
  )
};

export const getStatus = (userId: number) => {
  return (
    axiosFetch.get<string>(`profile/status/${userId}`).then(response => response.data)
  )
};

export const updateStatus = (status: string) => {
  return (
    axiosFetch.put<TResponse>(`profile/status`, { status: status }).then(response => response.data)
  )
};

export const savePhoto = (photoFile: any) => {
  const formData = new FormData();
  formData.append('image', photoFile);
  return (
    axiosFetch.put<TResponse<TSavePhotoResponse>>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => response.data)
  )
};

export const saveProfile = (profile: profileType) => {
  return (
    axiosFetch.put<TResponse<TSavePhotoResponse>>(`profile`, profile )
  ).then(response => response.data)
};

