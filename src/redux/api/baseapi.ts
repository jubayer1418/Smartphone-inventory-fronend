// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
  credentials: "include",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.token;
    console.log(token);
    if (token) {
      headers.set("authorization", token);
    }

    return headers;
  },
});
export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Phone"],
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log(result);
    if (result?.error?.status === 404) {
      toast.error(result?.error?.data?.message);
    }
    if (result?.error?.status === 500) {
      const res = await fetch("http://localhost:5000/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data?.data?.token) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(
          setUser({
            user,
            token: data?.data?.token,
          })
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }

    return result;
  },
  endpoints: () => ({}),
});
