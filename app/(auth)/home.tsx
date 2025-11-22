import Tile from '@/components/HomePage/Tile'
import { useAuth } from '@/context/AuthContext'
import { useConfig } from '@/context/UrlsContext'
import { AccountInfo, AllowedAccounts } from '@/global/constants/allowedAccounts'
import { getToken } from '@/utils/token'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const home = () => {
   const {session} = useAuth();
   const [connectedAccounts,setConnectedAccounts] = useState();
   const config = useConfig()
   const token = getToken()
   

  // useEffect(()=>{
  //  let token; 
  //  getToken().then((val)=> token = val)
  //  axios.get<any>(config.backendUrl + String(djangoUrls.connectedAccounts),{headers:{
  //   Authorization: `Bearer ${token}`
  //  }}).then((val)=>{
  //   setConnectedAccounts(val.data)
  //  })
  // },[])

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
    <View className='w-full flex-1 gap-10 px-3 pt-6'>
       {AllowedAccounts.map((item:AccountInfo)=>(<Tile icon={item.icon} socialAccount={item.socialAccount}/>))}
    </View>
   </SafeAreaView>
  )
}

export default home