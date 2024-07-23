// /src/util/axiosInstance.js
import axios from "axios";

// Axios 인스턴스 생성 및 설정
export const axiosBase = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json",
  },
});

type AxiosRequestPropType = {
  endPoint: string;
  config?: object;
};
export const axiosRequest = async ({
  endPoint,
  config = {},
}: AxiosRequestPropType) => {
  const source = axios.CancelToken.source();
  try {
    const response = await axiosBase.request({
      url: endPoint,
      ...config,
      cancelToken: source.token,
    });
    // Abort 펑션인 cancelToken 을 함께 반환합니다.
    return { data: response.data, cancelToken: source };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
