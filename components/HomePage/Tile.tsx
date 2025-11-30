import { AccountInfo } from '@/global/constants/allowedAccounts';
import { LinkedinConfig } from '@/global/constants/linkedin.config';
import { useLinkedInStore } from '@/store/linkedInStore';
import { useUrlStore } from '@/store/urlStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';


WebBrowser.maybeCompleteAuthSession();

const DISCOVERY = {
  authorizationEndpoint: LinkedinConfig.serviceConfiguration.authorizationEndpoint,
  tokenEndpoint: LinkedinConfig.serviceConfiguration.tokenEndpoint,
};

const ClientId = LinkedinConfig.clientId;
const BackendUri = useUrlStore((state) => state.backendUrl) + '/linkedin/connect';

const Tile = ({icon,socialAccount}:AccountInfo) => {
  const {exchangeCodeForToken} = useLinkedInStore()
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: ClientId,
      scopes: ['openid', 'profile', 'email', 'w_member_social'],
      redirectUri:"https://x17hwf7f-8000.inc1.devtunnels.ms/linkedin/callback/",
      responseType: ResponseType.Code,
    },
    DISCOVERY
  );
   useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('Auth Code received:', code);
      exchangeCodeForToken(code);
    } else if (response?.type === 'error') {
      Toast.show({
        type: 'error',
        text1: 'Authentication Error',
        text2: 'Failed to authenticate with LinkedIn.',
      })
    }
  }, [response]);

  return (
    <View style={styles.container} >
      <FontAwesome name={icon} size={40} color={"white"}/>
      <Text style={styles.text}>Connect Your {socialAccount}</Text>
      <TouchableOpacity onPress={()=> {
        if (socialAccount.toLocaleLowerCase() === 'linkedin') {
          promptAsync();
        }
        else{
          Toast.show({
            type: 'info',
            text1: 'Info',
            text2: `Connection for ${socialAccount} is not implemented yet.`,
          })
        }
      }}  className='flex-row  flex justify-center items-center ' style={styles.button} >
          <Text style={styles.text2} className=' font-semibold'>
            Connect
        </Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:80,
    backgroundColor: '#1e293b', 
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
   borderRadius:4,
   backgroundColor:'#38bdf8'
  },
  text2:{
    color:'#1e293b',
    fontWeight:'600'
  }
});

export default Tile