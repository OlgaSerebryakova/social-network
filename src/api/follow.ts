import axiosFetch, { TResponse } from "./axios";

export const postFollow = (id: number) => {
  return axiosFetch.post<TResponse>(`follow/${id}`)
};

export const deleteUnfolow = (id: number) => {
  return axiosFetch.delete(`follow/${id}`) as Promise<TResponse>
};