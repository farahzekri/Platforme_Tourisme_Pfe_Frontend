import { Outlet,Link } from "react-router-dom";
import { useEffect,useRef,useState } from "react";
import { useSelector } from "react-redux";
import usePersiste from "views/hooks/userPersist";
import { selectCurrentToken } from "ApiSlice/authSlice";
import { useRefreshMutation } from "ApiSlice/authApiSlice";



const PersistLogin =() => {
    const [persist]=usePersiste()
    const token =useSelector(selectCurrentToken)
    const effectRan =useRef(false)
    const [trueSuccess,setTruesucces]=useState(false)

    const [refresh,{
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }]=useRefreshMutation()

    useEffect(()=>{
        if(effectRan.current=== true || process.env.NODE_ENV !='development'){
            const verifyRefreshToken = async()=>{
                console.log('verifying refresh token')
                try{
                    await refresh()
                    setTruesucces(true)
                }
                catch(err){
                    console.error(err)
                }
            }
            if(!token && persist) verifyRefreshToken()
        }
      return ()=> effectRan.current = true
    },[])


    let content
    if(!persist){
        console.log('no persist')
        content=<Outlet/>

    }else if (isLoading){
        console.log('loading')
        content=<p>Loading....</p>
    }else if(isError) {
        content = (
            <p className='errmsg'>
                {error.data?.message}
                <Link to="/auth/login">Please login again</Link>.
            </p>
        )
    }else if (isSuccess && trueSuccess){
        console.log('success')
        content=<Outlet/>
    }else if (token && isUninitialized){
        console.log('token and uninit')
        console.log(isUninitialized)
        content=<Outlet/>
    }
    return content 
}
export default PersistLogin