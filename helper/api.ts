import { ApiResponse } from "@/types/common";
import axios from "axios";

export const get = async (
  url: string,
  headers: { Authorization: string; Accept: string; "Content-Type": string },
): Promise<ApiResponse> => {
  const data: ApiResponse = { data: null, error: null };

  const res = await axios
    .get(url, {
      headers,
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));

  console.log(">>> const res", res);

  return data;
};
