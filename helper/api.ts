import { ApiResponse } from "@/types/common";
import axios from "axios";

export const get = async (
  url: string,
  headers: { Authorization: string; Accept: string; "Content-Type": string },
): Promise<ApiResponse> => {
  const response: ApiResponse = { data: null, error: null };

  await axios
    .get(url, {
      headers,
    })
    .then((success) => {
      response.data = success.data;
    })
    .catch((error) => {
      response.error = error.toJSON();
    });

  return response;
};
