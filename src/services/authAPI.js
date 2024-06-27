import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const authApi = createApi({
  reducerPath: "authManagement",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ memberName, password }) => ({
        url: `members/login`,
        method: "POST",
        body: { memberName, password },
      }),
    }),
    registerUser: builder.mutation({
      query: ({ memberName, password, name, yob }) => ({
        url: `members/register`,
        method: "POST",
        body: { memberName, password, name, yob },
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
