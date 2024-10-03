import { NEXT_PUBLIC_CIRCLE_API } from "@/lib/environment";
import { isWindowOnFocus } from "@/lib/pageVisibility";
import { IPayment } from "@/lib/types";
import { usePaymentsStore } from "@/store/usePaymentsStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_ENDPOINT = `${NEXT_PUBLIC_CIRCLE_API}/payments`;

export const useGetPayments = () => {
  const addPayment = usePaymentsStore((state) => state.addPayment);

  return useQuery({
    queryKey: ["getPayments"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_ENDPOINT}`);
      addPayment(data.data);
      return data;
    },
    refetchInterval: isWindowOnFocus() ? 1000 : 500, // This helps fix in some way the browser throttling when not on focus
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });
};

// replace any with the proper type
export const usePostPayments = (payment: IPayment) => {
  return useQuery({
    queryKey: ["postPayments"],
    queryFn: async () => {
      const response = await axios.post(`${API_ENDPOINT}`, payment);

      console.log(response);
      return null;
    },
  });
};
