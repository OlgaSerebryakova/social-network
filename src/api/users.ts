import axiosFetch from "./axios";
import { userType } from "../types/types";

type GetItemsType = {
  items: Array<userType>
  totalCount: number
  error: string | null
}

export const getUsers = (currentPage = 1, pageSize = 20) => {
  return (
    axiosFetch.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
  )
};