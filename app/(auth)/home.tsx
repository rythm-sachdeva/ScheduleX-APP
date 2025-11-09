import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const home = () => {
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