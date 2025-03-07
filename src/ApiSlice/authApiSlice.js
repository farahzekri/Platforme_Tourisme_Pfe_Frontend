import { apiSlice } from "app/api/apiSlice";
import { logOut,setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      login: builder.mutation({
        query: credentials => ({
          url: '/auth/login',
          method: 'POST',
          body: { ...credentials }
        })
      }),
      sendLogout : builder.mutation({
        query:()=>({
            url:'/auth/logout',
            method:'Post',
        }),
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            try {
              await queryFulfilled
              dispatch(logOut())
              dispatch(apiSlice.util.resetApiState())
            } catch (err) {
              console.log(err)
            }
          }
      }),
      registerWithGoogle: builder.mutation({
        query: (credentials) => ({
          url: '/auth/google/callback',
          method: 'POST',
          body: { ...credentials },  // Send email, firstName, lastName
        }),
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            console.log(data);
            const { accessToken, user } = data; // Extract the accessToken and user from the response
            dispatch(setCredentials({ accessToken, currentUser: user })); // Dispatch to update the state
          } catch (err) {
            console.error("Erreur lors de l'authentification Google :", err);
          }
        },
      }),
      refresh:builder.mutation({
        query:()=>({
            url:'/auth/refresh',
            method:'Get',
            credentials: 'include',
        }),
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            try {
              const { data } = await queryFulfilled
              console.log(data)
              const { accessToken, collection,id ,email,name,statue,role,privilege} = data
              dispatch(setCredentials({ accessToken, collection,id,email,name,statue,role,privilege }))
            } catch (err) {
              console.log(err)
            }
          }
      }),
     
     
     
     
    })
  })

  export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useRegisterWithGoogleMutation
  }=authApiSlice