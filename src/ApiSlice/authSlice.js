import {createSlice} from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
 
const authSlice =createSlice({
    name:'auth',
    initialState:{token:null,collection: null ,id:null ,email: null,name: null,statue:null,isAuthorized : false,role:null,privilege:null,typeAgence:null},
    reducers:{
        setCredentials:(state,action)=>{
            const {accessToken,collection ,email,name,statue,role,privilege,typeAgence}=action.payload
            let id = action.payload.id;

            if (!id && accessToken) {
                const decoded = jwtDecode(accessToken);
                id = decoded.id; 
            }
            state.token = accessToken
            state.collection = collection;
            state.id = id;
            state.email = email;
            state.name = name;
            state.statue = statue;
            state.isAuthorized = true;
            state.role=role;
            state.privilege=privilege;
            state.typeAgence=typeAgence;    
            console.log("ID stocké dans Redux après décodage :", state.id); 
        },
        logOut:(state,action)=>{
            state.token= null
            state.collection = null
            state.id = null
            state.email = null
            state.name = null;
            state.statue = null;
            state.isAuthorized = false;
            state.role=null;
            state.privilege=null;
            state.typeAgence=null;
        }
    }

})

export const {setCredentials,logOut}=authSlice.actions

export default authSlice.reducer

export const selectCurrentToken=(state)=>state.auth.token
export const selectCurrentUserId = (state) => state.auth.id;
export const selectIsAuthorized = (state) => state.auth.isAuthorized;

