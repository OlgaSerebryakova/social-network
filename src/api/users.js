import axiosFetch from "./axios";

export const getUsers = (currentPage = 1, pageSize = 20) => {
  return (
    axiosFetch.get(`users?page=${currentPage}&count=${pageSize}`)
  )
};