import { FontAwesome6 } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const HomeHeader = () => {
  return (
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
  )
}

export default HomeHeader