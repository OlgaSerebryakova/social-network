import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    "API-KEY": "3ef7eb18-cd63-4b8d-bccf-9137d9faaec6"
  }
});

export default axiosFetch;

export type TResponse<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCapcthaEnum {
  CaptchaIsRequired = 10
}