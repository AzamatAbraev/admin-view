import { create } from "zustand";
import request from "../server";
import UserType from "../types/user";

interface UsersType {
  loading: boolean;
  users: UserType[];
  getAllUsers: () => void;
  updateUser: (user: { id: string; name?: string; email?: string }) => void;
  deleteUser: (id: string) => void;
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
}

const useUsers = create<UsersType>()((set, get) => ({
  loading: false,
  users: [],
  getAllUsers: async () => {
    set({ loading: true });
    try {
      const {
        data: { users },
      } = await request.get("users");
      set({ users });
    } finally {
      set({ loading: false });
    }
  },
  deleteUser: async (id) => {
    try {
      set({ loading: true });
      await request.delete("users", { data: { userId: id } });
      await get().getAllUsers();
    } finally {
      set({ loading: false });
    }
  },
  blockUser: async (id) => {
    try {
      set({ loading: true });
      await request.patch("auth/block", { userId: id });
      get().getAllUsers();
    } finally {
      set({ loading: false });
    }
  },
  unblockUser: async (id) => {
    try {
      set({ loading: true });
      await request.patch("auth/unblock", { userId: id });
      get().getAllUsers();
    } finally {
      set({ loading: false });
    }
  },
  updateUser: async ({ id, name, email }) => {
    try {
      set({ loading: true });
      await request.patch(`/users/${id}`, { name, email });
      await get().getAllUsers();
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUsers;
