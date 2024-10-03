import { IUser } from "@/lib/types";
import { create } from "zustand";

interface IUsersSelector {
  value: string;
  label: string;
}

interface IUseUsersStore {
  users: IUser[];
  setUsers: (newUsers: IUser[]) => void;
  getUsersForSelector: () => IUsersSelector[];
}

export const useUsersStore = create<IUseUsersStore>((set, get) => ({
  users: [],
  setUsers: (newUsers: any) =>
    set(() => ({
      users: newUsers,
    })),
  getUsersForSelector: () => {
    return get().users.map((user) => ({
      value: JSON.stringify(user),
      label: `${user.id} - ${user.name}`,
    }));
  },
}));
