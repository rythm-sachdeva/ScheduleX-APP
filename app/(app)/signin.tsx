import { useAuth } from '@/context/AuthContext'
import { ISignInRequest } from '@/context/entity/auth.entity'
import { EyeIcon, EyeSlashIcon } from '@/global/Icons/EyeIcon'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  const [formData,setFormData] = useState<ISignInRequest>({email:"",password:""});
const [showPassword , setShowPassword] = useState<boolean>(false)
const {signIn} = useAuth();
const router = useRouter();

  return (
   <SafeAreaView className='flex-1 bg-slate-900'>
    <KeyboardAwareScrollView
    contentContainerStyle={{flexGrow:1}}
    keyboardShouldPersistTaps='handled'
    showsVerticalScrollIndicator={false}
    enableOnAndroid={true}
    extraScrollHeight={20}

    >
      <View className='flex-1 px-6 pt-12 pb-8'>
        {/* Header */}
                  <View className="items-center mb-10">
                    <Text className="text-white text-4xl font-bold mb-2">ScheduleX</Text>
                    <Text className="text-gray-300 text-lg">Login to Your Account</Text>
                  </View> 

          <View className="mb-4">
                        <Text className="text-gray-200 text-base mb-2">Email</Text>
                        <TextInput
                          className="bg-gray-800 text-white rounded-lg p-4 text-base border border-gray-700 focus:border-blue-500"
                          placeholder="email@example.com"
                          placeholderTextColor="#9CA3AF"
                          value={formData.email}
                          onChangeText={(text)=>{setFormData((form)=>({...form,email:text}))}}
                        />
              </View>
              <View className="mb-4">
                            <Text className="text-gray-200 text-base mb-2">Password</Text>
                            <View className="relative">
                              <TextInput
                                className="bg-gray-800 text-white rounded-lg p-4 text-base pr-12 border border-gray-700 focus:border-blue-500"
                                placeholder="Create a password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                                value={formData.password}
                                onChangeText={(text)=>{setFormData((form)=>({...form,password:text}))}}
                              />
                              <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                              >
                                {showPassword ? (
                                  <EyeSlashIcon size={24} color="#9CA3AF" />
                                ) : (
                                  <EyeIcon size={24} color="#9CA3AF" />
                                )}
                              </TouchableOpacity>
                            </View>
                          </View>

                    {/* Sign Up Button */}
          <TouchableOpacity
            className="bg-blue-500 rounded-lg p-4 items-center justify-center mb-6"
            onPress={()=>(signIn(formData.email,formData.password))}
          >
            <Text className="text-white text-lg font-semibold">Sign In</Text>
          </TouchableOpacity>

          {/* Already have an account? */}
          <View className="flex-row justify-center mb-8">
            <Text className="text-gray-300 text-base">New Here? </Text>
            <TouchableOpacity onPress={() => router.navigate('/(app)/signup') }>
              <Text className="text-blue-400 text-base font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <Text className="text-gray-500 text-sm text-center">
            By signing in, you agree to our{' '}
            <Text className="text-gray-400">Terms of Service</Text> and{' '}
            <Text className="text-gray-400">Privacy Policy</Text>.
          </Text>


      </View>


      

    </KeyboardAwareScrollView>


   </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({})