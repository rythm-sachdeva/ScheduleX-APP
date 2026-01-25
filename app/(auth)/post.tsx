import { DateComponent } from '@/components/generic/DateComponent';
import { useAccountConfigStore } from '@/store/accountStore';
import { useAuthStore } from '@/store/authStore';
import { useDateStore } from '@/store/dateStore';
import { useUrlStore } from '@/store/urlStore';
import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


const Post = () => {
  const {linkedAccounts} = useAccountConfigStore();
  const [caption, setCaption] = React.useState('');
  const {backendUrl} = useUrlStore()
  const {getAccessToken,session} = useAuthStore();
  const {openDatePicker,setOpenDatePicker}= useDateStore();
  const handleClick = async () =>{
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(backendUrl + 'linkedin/post/',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken ?? session}`
        },
        body: JSON.stringify({ content: caption})
      });
      if(response.ok){
        Toast.show({
          type:'success',
          text1:"Post Scheduled Successfully"
        })
      }
    } catch (error) {
      console.log(error)
      Toast.show({
        type:'error',
        text1:"Error While Posting"
      })
    }
  }
  return (
    <SafeAreaView className='flex-1 pt-9 gap-2 p-4 bg-background-dark'>
      <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:50,}} showsVerticalScrollIndicator={false}>
      <KeyboardAwareScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View>
         <View className='flex justify-center items-center'>
           <Text className='text-white text-3xl mb-6 font-semibold'>
            Create Post
          </Text>
         </View>
        </View>
        <View className='flex ' style={styles.uploadBox}>
          <Feather name="upload" className='mb-3 text-primary' size={30} color="#4A90E2" /> 
          <Text className='text-white text-lg font-semibold'>Tap to add Photos Or Videos</Text>     
          <Text className='text-slate-600 text-sm'>Upload media for your posts</Text>   
            
            {/* <Text className='font-semibold mt-6 p-4 bg-slate-700 text-lg rounded-2xl text-white'>Upload Media</Text> */}
        </View>
       
        {/* Caption  */}
        <View className='flex flex-row mt-3 -mb-4 justify-between'>
          <Text className='text-white text-lg mb-2'>Caption</Text>
          <Text className='text-white text-lg mb-2'>0/2200</Text>
          </View>


        <View className='form-input mt-5 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] focus:border-primary dark:focus:border-primary min-h-20 p-[15px]'>
          <TextInput 
            className='text-white text-xl min-h-[400px] overflow-scroll' 
            placeholder='Write Caption'  
            placeholderTextColor='#94a3b8'
            value={caption} 
            onChangeText={setCaption}
            multiline={true}
            textAlignVertical='top'
          />
</View>
 <View className='mt-5 gap-1 flex justify-center items-center p-5 rounded-xl'>
          <Text className='text-text-dark text-lg font-semibold mb-2'>
            Connected Accounts
          </Text>
         {
          <FlatList
  data={linkedAccounts}
  horizontal
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item, index) => index.toString()}
  contentContainerStyle={{ paddingRight: 0 }} 
  renderItem={({ item: account, index }) => (
    <TouchableOpacity 
      className='flex-row justify-between gap-4 items-center w-30 mr-4 p-4 bg-slate-800 rounded-lg'
      onPress={() => {}}
    >
      //@ts-ignore
      <FontAwesome name={account.provider} size={20} color={"#34D399"}/>
      <Text className='text-white font-semibold text-lg'>
        {account.provider.charAt(0).toUpperCase() + account.provider.slice(1)}
      </Text>
    </TouchableOpacity>
  )}
/>
         }
        </View>
      
          <DateComponent/>
     
        <TouchableOpacity className='bg-primary rounded-full p-4 items-center justify-center my-10' onPress={handleClick}>
            <Text className='text-white text-lg font-semibold'>Schedule Post</Text>
          </TouchableOpacity>
      </KeyboardAwareScrollView>
      </ScrollView>
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
    borderStyle:'dashed'
  }
})


export default Post