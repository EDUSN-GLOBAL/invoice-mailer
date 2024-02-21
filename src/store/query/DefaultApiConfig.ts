import { BaseQueryApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query"

import { RootState } from "../store"
import { updateToken } from "../slice/AuthSlice"
type prepareHeaders = (
  headers: Headers,
  api: {
    getState: () => unknown
    extra: unknown
    endpoint: string
    type: 'query' | 'mutation'
    forced: boolean | undefined
  }
) => Headers | void

const baseQuery  = fetchBaseQuery({
  baseUrl: 'http://localhost:8082/api/v1',

  prepareHeaders : (headers, { getState }) => {

    const token = (getState() as RootState).auth.token; 
    

    if (token) {
   
      headers.set('Authorization', `Bearer ${token}`);
    }


    return headers;
  }
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

if (result?.error && 'originalStatus' in result.error){
/*  alert(result.error.data) */
}
  if (result.error?.status === 403 || result.error?.status === 401) {
 const refreshToken = (api.getState() as RootState).auth.refreshToken;
 
 // Send a request to the server to refresh the token
 const response = await fetch('http://localhost:8082/api/v1/auth/refresh-token', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ token: refreshToken }),
 });

 if (!response.ok) {
   throw new Error('Failed to refresh token');
 }

 const data = await response.json();

 // Update the state with the new access token
 api.dispatch(updateToken(data.token));

 // Retry the original request
 result = await baseQuery(args, api, extraOptions);
}

  return result;
};