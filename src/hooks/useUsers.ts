import { NEXT_PUBLIC_CIRCLE_API } from "@/lib/environment";
import { useUsersStore } from "@/store/useUsersStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_ENDPOINT = `${NEXT_PUBLIC_CIRCLE_API}/users`;

export const useGetUsers = () => {
  const { setUsers } = useUsersStore((state) => state);

  return useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_ENDPOINT}`);

      setUsers(data.data);
      return data;
    },
  });
};
