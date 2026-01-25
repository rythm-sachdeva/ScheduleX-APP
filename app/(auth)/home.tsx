import Tile from '@/components/HomePage/Tile'
import { AccountInfo, AllowedAccounts } from '@/global/constants/allowedAccounts'
import { djangoUrls } from '@/global/Endpoints/django-endpoints'
import { useAccountConfigStore } from '@/store/accountStore'
import { useAuthStore } from '@/store/authStore'
import { useLinkedInStore } from '@/store/linkedInStore'
import { useConfig } from '@/store/urlStore'
import { getToken } from '@/utils/token'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import * as Linking from 'expo-linking'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Home = () => {
   const {session} = useAuthStore();
   const [connectedAccounts,setConnectedAccounts] = useState<any>(null);
   const config = useConfig();
   const {handleDeepLink} = useLinkedInStore();
   const {setLinkedAccounts} = useAccountConfigStore()
   
  useEffect(()=>{
   let token; 
   getToken().then((val)=> token = val)

   fetch(config.backendUrl + String(djangoUrls.connectedAccounts),{headers:{
    Authorization: `Bearer ${session}`
   }}).then((val)=>{
      val.json().then((valu)=>  {setConnectedAccounts(valu)
        setLinkedAccounts(valu)
      })        
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
   <SafeAreaView className='flex-1 flex-col bg-background-dark'>
    {/* Header  */}
    <View className='flex-row justify-between items-center pt-6 px-4 py-3 '>
      <TouchableOpacity>
        <FontAwesome6 name="calendar-week" size={24} color="white" />
      </TouchableOpacity>
      <Text className='text-white pl-2 text-3xl font-semibold'>
       Post Schedule
      </Text>

      <TouchableOpacity className='px-3 py-1 rounded-full flex justify-center items-center'>
       <FontAwesome6 name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
    {/* Main Content  */}
   { 
    <View className='w-full flex-1 gap-10 px-3 pt-6'>
       {AllowedAccounts.map((item:AccountInfo)=>(<Tile key={item.socialAccount} icon={item.icon} socialAccount={item.socialAccount}/>))}
    </View>
   }
   </SafeAreaView>
  )
}

export default Home