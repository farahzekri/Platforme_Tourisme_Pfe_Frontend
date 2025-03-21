import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setCredentials} from "../../ApiSlice/authSlice";


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})


const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions)

  // If you want, handle other status codes, too
  if (result?.error?.status === 401) {
    console.log('sending refresh token')

    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshResult?.data) {

      api.dispatch(setCredentials({
        accessToken: refreshResult.data.accessToken,
        collection: refreshResult.data.collection,
        id:refreshResult.data.collection,
        email:refreshResult.data.email,
        name:refreshResult.data.name,
        statue:refreshResult.data.statue,
        role:refreshResult.data.role,
        privilege:refreshResult.data.privilege,
        typeAgence: refreshResult.data.typeAgence,}))

      // retry original query with new access 
      result = await baseQuery(args, api, extraOptions)
    } else {

      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. "
      }
      return refreshResult
    }
  }

  return result
}



export const apiSlice = createApi({
  baseQuery : baseQueryWithReauth,
  tagTypes: [ 'User'],
  endpoints: builder => ({})
})