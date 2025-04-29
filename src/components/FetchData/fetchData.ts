import { ProductDTO } from "@/shared/interface/Data.interface";

/**
 * @param baseURL - API의 기본 주소
 * @param endPoint - 요청할 엔드포인트 (예: "/product?number=1")
 * @returns Promise<ProductDTO[]> - 비동기 응답 (배열)
 */
export default async function fetchData<T>(
  baseURL: string,
  endPoint: string
): Promise<T> {
  if (!baseURL) {
    throw new Error("BaseURL이 정의되지 않았습니다.");
  }

  const requestURL = `${baseURL.replace(/\/+$/, "")}${endPoint}`;

  const response = await fetch(requestURL);

  if (!response.ok) {
    throw new Error(`요청 실패: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}