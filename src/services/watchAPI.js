import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

export const watchApi = createApi({
  reducerPath: "watchManagement",
  tagTypes: ["WatchList"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState()); // Retrieve token from Redux state using selectToken selector
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      headers.append("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllWatch: builder.query({
      query: () => `watches`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "watchManagement", id })),
              { type: "WatchList", id: "LIST" },
            ]
          : [{ type: "WatchList", id: "LIST" }],
    }),
    getAllBrand: builder.query({
      query: () => `brands`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "watchManagement", id })),
              { type: "WatchList", id: "LIST" },
            ]
          : [{ type: "WatchList", id: "LIST" }],
    }),

    getWatchById: builder.query({
      query: (id) => `/watches/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: "watchManagement", id: result.id }] : [],
    }),
    addComment: builder.mutation({
      query: ({ watchId, ...comment }) => ({
        url: `/watches/${watchId}/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: (result, error, { watchId }) => [
        { type: "Watch", id: watchId },
      ],
    }),
    getMemberById: builder.query({
      query: (id) => `/members/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: "watchManagement", id: result.id }] : [],
    }),
    updateInfo: builder.mutation({
      query: (updatedMember) => ({
        url: `/members/update-info`,
        method: "PUT",
        body: updatedMember,
      }),
      invalidatesTags: (result, error, { memberId }) => [
        { type: "Member", id: memberId },
      ],
    }),
    updatePassword: builder.mutation({
      query: ({ passwordData }) => ({
        url: `/members/update-password`,
        method: "PUT",
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useGetAllWatchQuery,
  useGetWatchByIdQuery,
  useAddCommentMutation,
  useGetAllBrandQuery,
  useGetMemberByIdQuery,
  useUpdateInfoMutation,
  useUpdatePasswordMutation,
} = watchApi;
