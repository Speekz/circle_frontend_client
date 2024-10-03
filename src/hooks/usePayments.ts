import { NEXT_PUBLIC_CIRCLE_API } from "@/lib/environment";
import { usePaymentsStore } from "@/store/usePaymentsStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_ENDPOINT = `${NEXT_PUBLIC_CIRCLE_API}/payments`;

export const getPayments = () => {
  const addPayment = usePaymentsStore((state) => state.addPayment);

  return useQuery({
    queryKey: ["getPayments"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_ENDPOINT}`);

      addPayment(data.data);
      return data;
    },
    refetchInterval: 1000,
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
