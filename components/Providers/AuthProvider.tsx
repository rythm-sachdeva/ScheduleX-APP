import { AuthContext } from '@/context/AuthContext';
import { ISigninResponse, ISignUpRequest, ISignUpResponse } from '@/context/entity/auth.entity';
import { useConfig } from '@/context/UrlsContext';
import { ScheduleError } from '@/global/Error/error';
import { deleteToken, getToken, setToken } from '@/utils/token';
import React, { useEffect, useState } from 'react';






const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [session,setSession] = useState<string | null>(null);
    const [isLoading,setLoading] = useState<boolean>(false);
const signIn = async (email:string,password:string) : Promise<void>=>{
  const config = useConfig();
  const data = {email,password};
    try {
      setLoading(true)
      const {access,refresh} = (await axios.post<ISigninResponse>(config.backendUrl + String('api/auth/login/'),data)).data
      await setToken(access,refresh)
    } catch (error) {
      throw new ScheduleError("Error While Signing In","signIn")
    }finally{
      setLoading(false)
    }
}
const signOut = async () : Promise<void> =>{
   try {
    setLoading(true)
    await deleteToken();
   } catch (error) {
    
   }
   finally{
    setLoading(false)
   }
}
const signUp = async(data:ISignUpRequest) : Promise<void> =>{
  const config = useConfig();
   try {
    setLoading(true)
    const {access,refresh} = (await axios.post<ISignUpResponse>(config.backendUrl + String('api/auth/registration/'),data)).data
    await setToken(access,refresh)
   } catch (error) {
    throw new ScheduleError("Error While SigningUp","signup")
   }
   finally{
    setLoading(false)
   }
}

useEffect(()=>{
  getToken().then((token)=>{
    if(token)
      setSession(token)
  })
},[])

    
  return (
    <AuthContext.Provider value={{signIn,signOut,signUp,session,isLoading}}>
     {children}
    </AuthContext.Provider>
  )
}



export default AuthProvider