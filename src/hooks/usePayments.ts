import { NEXT_PUBLIC_CIRCLE_API } from "@/lib/environment";
import { IPayment } from "@/lib/types";
import { usePaymentsStore } from "@/store/usePaymentsStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_ENDPOINT = `${NEXT_PUBLIC_CIRCLE_API}/payments`;

export const useGetPayments = () => {
  const { livePayments, addPayment } = usePaymentsStore((state) => state);

  return useQuery({
    queryKey: ["getPayments"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_ENDPOINT}`);
      addPayment(data.data);
      return data;
    },
    refetchInterval: 1000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
    enabled: livePayments,
  });
};

// replace any with the proper type
export const usePostPayments = () => {
  const { addPayment } = usePaymentsStore((state) => state);

  return useMutation({
    mutationFn: async (payment: IPayment) => {
      await axios.post(`${API_ENDPOINT}`, payment);
      return payment;
    },
    retry: (failureCount, error) => {
      // @ts-expect-error error has status code
      return failureCount < Infinity && error.status === 503;
    },
    onSuccess: (data: IPayment) => {
      addPayment(data);
    },
  });
};
