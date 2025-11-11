import { useAuth } from '@/context/AuthContext'
import { useConfig } from '@/context/UrlsContext'
import { djangoUrls } from '@/global/Endpoints/django-endpoints'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const home = () => {
   const {session} = useAuth();
   const [connectedAccounts,setConnectedAccounts] = useState();
   const config = useConfig()

  useEffect(()=>{
   axios.get(config.backendUrl + String(djangoUrls.connectedAccounts),{headers:{
    Authorization: `Bearer ${session}`
   }})
  },[])

  return (
   <SafeAreaView className='flex-1 bg-slate-900'>
    {/* Header  */}
    <View className='flex flex-row justify-between items-center pt-6 px-4 py-3 '>
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
    
   </SafeAreaView>
  )
}

export default home