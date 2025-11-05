import { AuthContext } from '@/context/AuthContext';
import { ISigninResponse, ISignUpRequest, ISignUpResponse } from '@/context/entity/auth.entity';
import { useConfig } from '@/context/UrlsContext';
import { ScheduleError } from '@/global/Error/error';
import { deleteToken, getToken, setToken } from '@/utils/token';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';



const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [session,setSession] = useState<string | null>(null);
    const [isLoading,setLoading] = useState<boolean>(false);
    const router = useRouter();
     const config = useConfig();
const signIn = async (email:string,password:string) : Promise<void>=>{
 
  const data = {email,password};
    try {
      setLoading(true)
      const response = (await axios.post<ISigninResponse>(config.backendUrl + String('api/auth/login/'),data))
      if(response.status === 200)
      {
        Toast.show({
          type:'success',
          text1: "Signed in Successfully"
        })
        const {access,refresh} = response.data

      await setToken(access,refresh)
      router.navigate('/(auth)/home')
      }
    
      
    } catch (error) {
      Toast.show(
      {
        type:'error',
        text1:'SignUp failed',
        text2: String(error)
      }
    )
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
   try {
    setLoading(true)

    const response = (await axios.post<ISignUpResponse>(`${config.backendUrl}api/auth/registration/`,data))
    if(response.status === 201)
    {
      Toast.show({
        type:'success',
        text1:'Account created successfully'
      })
      const {access,refresh} = response.data
      await setToken(access,refresh)
      router.navigate('/(auth)/home')
    }
    
   } catch (error) {
    Toast.show(
      {
        type:'error',
        text1:'SignUp failed',
        text2: String(error)
      }
    )
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