import { useAuth } from "@/context/AuthContext";
import { ISignUpRequest } from "@/context/entity/auth.entity";
import { EyeIcon, EyeSlashIcon } from "@/global/Icons/EyeIcon";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
   const [formData,setFormData] = useState<ISignUpRequest>({
    username:"",
    email:"",
    password1:"",
    password2:"",
    first_name:"",
    last_name:""
   })
   const [showPassword , setShowPassword] = useState<boolean>(false)
   const [confirmPassword,setConfirmPassword] = useState<boolean>(false)
   const {signUp} = useAuth();
   const router = useRouter();
   
   
   

  return (
  <SafeAreaView className="flex-1 bg-slate-900">
         <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow:1}}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
      <View className="flex-1 px-6 pt-12 pb-8">
       {/* Header */}
          <View className="items-center mb-10">
            <Text className="text-white text-4xl font-bold mb-2">ScheduleX</Text>
            <Text className="text-gray-300 text-lg">Create Your Account</Text>
          </View> 
          {/* FormFields */}
          <View>
            <View className="mb-6">
            {/* First Name & Last Name */}
            <View className="flex-row justify-between mb-4">
              <View className="w-[48%]">
                <Text className="text-gray-200 text-base mb-2">First Name</Text>
                <TextInput
                  className="bg-gray-800 text-white rounded-lg p-4 text-base border border-gray-700 focus:border-blue-500"
                  placeholder="Enter your first name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.first_name}
                  onChangeText={(text)=>{setFormData((form)=>({...form,first_name:text}))}}
                />
              </View>
              <View className="w-[48%]">
                <Text className="text-gray-200 text-base mb-2">Last Name</Text>
                <TextInput
                  className="bg-gray-800 text-white rounded-lg p-4 text-base border border-gray-700 focus:border-blue-500"
                  placeholder="Enter your last name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.last_name}
                  onChangeText={(text)=>{setFormData((form)=>({...form,last_name:text}))}}
                />
              </View>
            </View>

            {/* Username */}
            <View className="mb-4">
              <Text className="text-gray-200 text-base mb-2">Username</Text>
              <TextInput
                className="bg-gray-800 text-white rounded-lg p-4 text-base border border-gray-700 focus:border-blue-500"
                placeholder="Choose a username"
                placeholderTextColor="#9CA3AF"
                value={formData.username}
                onChangeText={(text)=>{setFormData((form)=>({...form,username:text}))}}
              />
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className="text-gray-200 text-base mb-2">Email</Text>
              <TextInput
                className="bg-gray-800 text-white rounded-lg p-4 text-base border border-gray-700 focus:border-blue-500"
                placeholder="Enter your email address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text)=>{setFormData((form)=>({...form,email:text}))}}
              />
            </View>

            {/* Password */}
            <View className="mb-4">
              <Text className="text-gray-200 text-base mb-2">Password</Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-800 text-white rounded-lg p-4 text-base pr-12 border border-gray-700 focus:border-blue-500"
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={formData.password1}
                  onChangeText={(text)=>{setFormData((form)=>({...form,password1:text}))}}
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

            {/* Confirm Password */}
            <View className="mb-6">
              <Text className="text-gray-200 text-base mb-2">Confirm Password</Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-800 text-white rounded-lg p-4 text-base pr-12 border border-gray-700 focus:border-blue-500"
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!confirmPassword}
                  value={formData.password2}
                  onChangeText={(text)=>{setFormData((form)=>({...form,password2:text}))}}
                />
                <TouchableOpacity
                  onPress={() => setConfirmPassword(!confirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {confirmPassword ? (
                    <EyeSlashIcon size={24} color="#9CA3AF" />
                  ) : (
                    <EyeIcon size={24} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          </View>
          {/* Sign Up Button */}
          <TouchableOpacity
            className="bg-blue-500 rounded-lg p-4 items-center justify-center mb-6"
            onPress={()=>(signUp(formData))}
          >
            <Text className="text-white text-lg font-semibold">Sign Up</Text>
          </TouchableOpacity>

          {/* Already have an account? */}
          <View className="flex-row justify-center mb-8">
            <Text className="text-gray-300 text-base">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.navigate('/(app)/signin')}>
              <Text className="text-blue-400 text-base font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <Text className="text-gray-500 text-sm text-center">
            By signing up, you agree to our{' '}
            <Text className="text-gray-400">Terms of Service</Text> and{' '}
            <Text className="text-gray-400">Privacy Policy</Text>.
          </Text>
      </View>

     </KeyboardAwareScrollView>
  </SafeAreaView>
  );
}
