import { create } from "zustand";
import request from "../server";
import UserType from "../types/user";

interface UsersType {
  loading: boolean;
  users: UserType[];
  getAllUsers: () => void;
}

const useUsers = create<UsersType>()((set) => ({
  loading: false,
  users: [],
  getAllUsers: async () => {
    try {
      const {
        data: { users },
      } = await request.get("users");
      set({ loading: true, users });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUsers;
