import * as axios from "axios";
import axiosFetch from "./axios";

// export function getUsers() {
//   return axiosFetch
// }

// export const getUsers = (currentPage, pageSize) => {
//   return (
//     axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
//       {withCredentials: true})
//       .then(response => response.data)
//   )
// };

export const getUsers = (currentPage = 1, pageSize = 20) => {
  return (
    axiosFetch.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data)
  )
};