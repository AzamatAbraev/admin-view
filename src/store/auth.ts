import { FormInstance, message } from "antd";
import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import request from "../server";
import Cookies from "js-cookie";

interface AuthType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (form: FormInstance, navigate: NavigateFunction) => void;
}

const useAuth = create<AuthType>()((set) => ({
  isAuthenticated: Boolean(Cookies.get("TOKEN")),
  loading: false,
  login: async (form, navigate) => {
    try {
      const values = await form.validateFields();
      const {
        data: { token, user },
      } = await request.post("auth/login", values);
      set({ loading: true, isAuthenticated: true });
      Cookies.set("TOKEN", token);
      Cookies.set("USER_NAME", user?.name);
      Cookies.set("USER_ID", user?.userId);

      request.defaults.headers.Authorization = `Bearer ${token}`;

      message.success("You are logged in");
      navigate("/dashboard");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuth;
