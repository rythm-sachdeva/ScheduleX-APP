import Tile from '@/components/HomePage/Tile'
import { AccountInfo, AllowedAccounts } from '@/global/constants/allowedAccounts'
import { djangoUrls } from '@/global/Endpoints/django-endpoints'
import { useAuthStore } from '@/store/authStore'
import { useLinkedInStore } from '@/store/linkedInStore'
import { useConfig } from '@/store/urlStore'
import { getToken } from '@/utils/token'
import * as Linking from 'expo-linking'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const home = () => {
   const {session} = useAuthStore();
   const [connectedAccounts,setConnectedAccounts] = useState<any>(null);
   const config = useConfig();
   const {handleDeepLink} = useLinkedInStore();
   

  useEffect(()=>{
   let token; 
   getToken().then((val)=> token = val)

   fetch(config.backendUrl + String(djangoUrls.connectedAccounts),{headers:{
    Authorization: `Bearer ${session}`
   }}).then((val)=>{
      val.json().then((valu)=>  setConnectedAccounts(valu))        
   })
   const subscription = Linking.addEventListener('url', (event) => {
    // console.log(event)
    handleDeepLink(event);
   }
   );
   return () => {
    subscription.remove();
   };

  },[])

  return (
   <SafeAreaView className='flex-1 flex-col bg-slate-900'>
    {/* Header  */}
    <View className='flex-row justify-between items-center pt-6 px-4 py-3 '>
      <Text className='text-white text-2xl font-semibold '>
        Cal
      </Text>
      <Text className='text-white text-3xl font-semibold'>
       Post Schedule
      </Text>

      <TouchableOpacity className='bg-cyan-400 px-3 py-1 rounded-full flex justify-center items-center'>
        <Text className='text-white text-3xl'>
         +
        </Text>
      </TouchableOpacity>
    </View>
    {/* Main Content  */}
   { 
    <View className='w-full flex-1 gap-10 px-3 pt-6'>
       {AllowedAccounts.map((item:AccountInfo)=>(<Tile icon={item.icon} socialAccount={item.socialAccount}/>))}
    </View>
   }
   </SafeAreaView>
  )
}

export default home