import React from 'react'
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const index = () => {
  return (
    <SafeAreaView className='flex-1 bg-slate-900 '>
      <StatusBar barStyle='light-content'/>
      <View className='flex-1 justify-between p-6'>
        {/* Header Section */}
        <View>
          <Text className='font-bold text-2xl text-white text-center'>
            ScheduleX
          </Text>
        </View>
       {/* Middle Content  */}
       <View className='items-center'>
        <Image source={require('../assets/images/hompage-banner.png')} className='w-full h-64 rounded-xl mb-8' resizeMode='cover'/>
         <Text className='font-bold text-3xl text-white text-center mb-4'>
          Effortless Social Media Scheduling
         </Text>
         <Text className="text-gray-300 text-lg text-center">
            Connect your accounts and schedule posts across all your
            platforms in one place.
          </Text>
       </View>
       {/* Buttons and Clickable content */}
       <View className='mb-3'>
        <TouchableOpacity className='bg-blue-400 py-4 mb-4 rounded-full'>
          <Text className='text-white text-lg font-bold text-center'>
            Get Started

          </Text>

        </TouchableOpacity>
        <TouchableOpacity>
            <Text className="text-gray-400 text-md text-center">
              Sign In
            </Text>
          </TouchableOpacity>

       </View>

      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})