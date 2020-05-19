import axiosFetch from "./axios";

type TResponsePostFollow = {
  data: Object
  resultCode: number
  messages: Array<string>
}

export const postFollow = (id: number) => {
  return axiosFetch.post<TResponsePostFollow>(`follow/${id}`)
};

export const deleteUnfolow = (id: number) => {
  return axiosFetch.delete(`follow/${id}`)
};