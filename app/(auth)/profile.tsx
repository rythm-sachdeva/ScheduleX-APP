import Tile from '@/components/HomePage/Tile'
import { AccountInfo, AllowedAccounts } from '@/global/constants/allowedAccounts'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
   <SafeAreaView className='min-h-screen bg-background-dark'>
    {/* Header  */}
    <View className='py-5 border-b border-gray-700 flex  flex-row justify-center items-center mb-6'>
     <Text className='text-white text-xl font-semibold'>
        Connected Accounts
     </Text>
    </View>

    {/* Main Content  */}
       { 
        <View className='w-full flex-1 p-2 gap-10 px-3 pt-6'>
           {AllowedAccounts.map((item:AccountInfo)=>(<Tile key={item.socialAccount} icon={item.icon} socialAccount={item.socialAccount}/>))}
        </View>
       }
   </SafeAreaView>
  )
}

export default Profile