import { AccountInfo } from '@/global/constants/allowedAccounts';
import { LinkedinConfig } from '@/global/constants/linkedin.config';
import { useAccountConfigStore } from '@/store/accountStore';
import { useAuthStore } from '@/store/authStore';
import { useLinkedInStore } from '@/store/linkedInStore';
import { useConfig } from '@/store/urlStore';
import { Feather } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';


WebBrowser.maybeCompleteAuthSession();



const ClientId = LinkedinConfig.clientId;

const Tile = ({icon,socialAccount}:AccountInfo) => {
  const {exchangeCodeForToken} = useLinkedInStore()
  const {backendUrl} = useConfig();
  const {session} = useAuthStore();
  const {linkedinConnected} = useLinkedInStore()
  const {linkedAccounts} = useAccountConfigStore();
  // console.log(session)
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "frontend-app-1234",
      scopes: [],
      redirectUri:"https://x17hwf7f-8000.inc1.devtunnels.ms/linkedin/callback/",
      responseType: ResponseType.Code,
      extraParams:{
        auth_token: session!
      }
    },
    {
      authorizationEndpoint: backendUrl + 'linkedin/login/',
    }
  );

  return (
    <View style={styles.container} >
      <FontAwesome name={icon} size={40} color={"white"}/>
      <Text style={styles.text}>Connect Your {socialAccount}</Text>
      <TouchableOpacity onPress={()=> {
        if (socialAccount.toLocaleLowerCase() === 'linkedin' && !linkedinConnected) {
          promptAsync();
        }
        else{
          Toast.show({
            type: 'info',
            text1: 'Info',
            text2: `Connection for ${socialAccount} is not implemented yet.`,
          })
        }
      }}  className={`flex-row flex justify-center items-center  `} style={(socialAccount.toLocaleLowerCase() === 'linkedin' && linkedAccounts.find((item)=>item.provider === socialAccount.toLowerCase()))?styles.disabledbutton:styles.button} >
         { !linkedAccounts.find((item)=>item.provider === socialAccount.toLowerCase()) ? <Text style={styles.text2} className=' font-semibold'>
           {(linkedAccounts.find((item)=>item.provider === socialAccount.toLowerCase()))? "Connected":"Connect"} 
        </Text>:<Feather name="check-circle" size={24} color="#7ED321" />}
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:80,
    backgroundColor: '#192730', 
    borderRadius: 20,              
    justifyContent: 'space-evenly',            
    borderColor: '#bfdbfe',
    display:'flex',
    paddingLeft: 15,
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
    gap:15
      
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight:"bold"
  },
  button:{
   gap:5,
   padding:10,
   borderRadius:100,
   backgroundColor:'#4A90E2'
  },
  disabledbutton:{
    gap:5,
   padding:10,
   borderRadius:100,
    opacity:0.6,
    // backgroundColor:'#7ED321'
  },
  text2:{
    color:'white',
    fontWeight:'600'
  }
});

export default Tile