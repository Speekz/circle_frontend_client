import { NEXT_PUBLIC_CIRCLE_API } from "@/lib/environment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_ENDPOINT = `${NEXT_PUBLIC_CIRCLE_API}/users`;

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const response = await axios.get(`${API_ENDPOINT}`);

      console.log(response);
      return null;
    },
  });
};
