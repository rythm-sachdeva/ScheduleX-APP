import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";



export function useProtectedRoute(session:string | null){
    const segments = useSegments();
    const router  = useRouter();
    const isAuthGroup = segments[0] == "(auth)";

  useEffect(()=>{
 if(!session && !isAuthGroup)
 {
    router.navigate('/(app)/signin')
 }
  
 if(session && !isAuthGroup)
 {
    router.replace('/(auth)/home')
 }


},[session,segments,isAuthGroup])    
}