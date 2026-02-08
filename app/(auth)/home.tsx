import GetStartedCard from '@/components/HomePage/GetStartedCard'
import PostTile from '@/components/HomePage/PostTile'
import Tile from '@/components/HomePage/Tile'
import { AccountInfo, AllowedAccounts } from '@/global/constants/allowedAccounts'
import { djangoUrls } from '@/global/Endpoints/django-endpoints'
import { useAccountConfigStore } from '@/store/accountStore'
import { useAuthStore } from '@/store/authStore'
import { useLinkedInStore } from '@/store/linkedInStore'
import { SchduledPost, usePostStore } from '@/store/postStore'
import { useConfig } from '@/store/urlStore'
import { getToken } from '@/utils/token'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Linking from 'expo-linking'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Home = () => {
   const {session} = useAuthStore();
   const [connectedAccounts,setConnectedAccounts] = useState<any>(null);
   const config = useConfig();
   const {handleDeepLink} = useLinkedInStore();
   const {setLinkedAccounts} = useAccountConfigStore()
   const {scheduledPosts,fetchScheduledPosts} = usePostStore()
   
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
   fetchScheduledPosts(session,config.backendUrl + String(djangoUrls.scheduledPosts)).then()

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
    <View className='border-b flex-row justify-between items-center  border-gray-700 py-4 px-6'>
      <View className='flex'>
        <Text className='text-white/70 text-md'>
        Welcome to ScheduleX
      </Text>
      {
        connectedAccounts == null && <Text className='text-white font-semibold text-2xl'>
       Get Started, 
      </Text>
      
      }</View>
      <View className='h-11 w-11 flex justify-center items-center rounded-lg border border-gray-700 bg-background-secondary-dark'>
       <Ionicons name="notifications" size={24} color="white" />
      </View>
    </View>
    {/* Main Content  */}
    <ScrollView contentContainerStyle={{paddingBottom:100}} className='flex-1 pt-6' showsVerticalScrollIndicator={false}>
        <GetStartedCard/>
        {/* Recent Posts  */}
        {
          scheduledPosts.length > 0 && <View>
            <Text className='px-4 font-semibold mb-2 text-2xl text-white'>
              Recent Posts
            </Text>
            <View className='flex gap-5 px-3'>
              {scheduledPosts.slice(0,5).map((post:SchduledPost)=>(
                <PostTile key={post.id} post={post}/>
              ))}
            </View>
          </View>
        }
        
        {/* Connected Accounts Section  */}
        <View className='px-4'>
           <Text className='text-white font-semibold text-2xl mb-2 mt-6'>Quick Connect</Text>
        </View>
        <View className='w-full flex-1 p-2 gap-10 px-3 pt-6'>
           {AllowedAccounts.map((item:AccountInfo)=>(<Tile key={item.socialAccount} icon={item.icon} socialAccount={item.socialAccount}/>))}
        </View>
      </ScrollView>
   
   </SafeAreaView>
  )
}

export default Home