import { Action, PayloadAction } from '@reduxjs/toolkit';

import { baseQueryWithReauth } from "./DefaultApiConfig";

import { HYDRATE } from 'next-redux-wrapper';
import { customCreateApi } from './CustomCreateApi';

  // normally inferred from state


function isHydrateAction(action: Action): action is PayloadAction<any> {
  return action.type === HYDRATE
}

 const generalApi = customCreateApi({
    reducerPath: "generalApi",

   baseQuery: baseQueryWithReauth,
     tagTypes:["login","student",'installment','files'],
    endpoints: (builder) => ({
    login: builder.mutation<any, login>({
       query: (data: login) => {

          return ({
            url: '/auth/login',
            method: 'POST',
            body: data
          })

       },invalidatesTags:   ['student']


    }), getStudentByName: builder.query<any, string>({
      query: (name: string) => ({
        url: `/staff/students/autocomplete`,
        params: { query: name },

        method: 'GET',
      })
    })
    }),
   extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },


 })
export default generalApi
export const { useLoginMutation,useGetStudentByNameQuery} = generalApi

 type login={
  email:string,
  password:string
 }
