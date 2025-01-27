import {createSlice} from '@reduxjs/toolkit'
 
const authSlice =createSlice({
    name:'auth',
    initialState:{token:null,collection: null , email: null,name: null,statue:null,role:null},
    reducers:{
        setCredentials:(state,action)=>{
            const {accessToken,collection ,email,name,statue,role}=action.payload
            state.token = accessToken
            state.collection = collection;
            state.email = email;
            state.name = name;
            state.statue = statue;
            state.role=role;
          
            
        },
        logOut:(state,action)=>{
            state.token= null
            state.collection = null
            state.email = null
            state.name = null;
            state.statue = null;
            state.isAuthorized = false;
            state.role=null;
        }
    }

})

export const {setCredentials,logOut}=authSlice.actions

export default authSlice.reducer

export const selectCurrentToken=(state)=>state.auth.token

// export const selectIsAuthorized = (state: { auth: AuthState }) => state.auth.isAuthorized;
