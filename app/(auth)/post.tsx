import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';


const Post = () => {
  return (
    <SafeAreaView className='flex-1 pt-9 p-4 bg-slate-900'>
      <KeyboardAwareScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        
        <View className='flex bg-slate-800' style={styles.uploadBox}>         
            <Feather name="upload" size={50} color="white" />
            <Text className='font-semibold pt-6 text-lg text-white'>Upload Media</Text>
        </View>
        <View className='mt-5 bg-blue-600 flex justify-center items-center p-5 rounded-xl'>
         <Text className='text-white text-xl '>Select Account</Text>
        </View>
        <View className='mt-5 bg-slate-900 border-[2px] border-white p-5 rounded-xl'>
         <TextInput className='text-white text-xl min-h-[300px] overflow-scroll placeholder:text-slate-400' placeholder='Write Caption'></TextInput>
        </View>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  uploadBox: {
    padding: 50,
    height: "30%",
    borderRadius: 10,
    borderWidth: 1, 
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#334155',
    borderStyle:'solid'
  }
})


export default Post