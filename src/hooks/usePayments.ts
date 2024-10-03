import { NEXT_PUBLIC_CIRCLE_API } from "@/lib/environment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_ENDPOINT = `${NEXT_PUBLIC_CIRCLE_API}/payments`;

export const getPayments = () => {
  return useQuery({
    queryKey: ["getPayments"],
    queryFn: async () => {
      const response = await axios.get(`${API_ENDPOINT}`);

      console.log(response);
      return null;
    },
  });
};

// replace any with the proper type
export const postPayments = (payment: any) => {
  return useQuery({
    queryKey: ["postPayments"],
    queryFn: async () => {
      const response = await axios.post(`${API_ENDPOINT}`, payment);

      console.log(response);
      return null;
    },
  });
};
