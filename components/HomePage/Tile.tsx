import { AccountInfo } from '@/global/constants/allowedAccounts';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Tile = ({icon,socialAccount}:AccountInfo) => {
  return (
    <View style={styles.container} >
      <FontAwesome name={icon} size={40} color={"white"}/>
      <Text style={styles.text}>Connect Your {socialAccount}</Text>
      <TouchableOpacity className='flex-row  flex justify-center items-center ' style={styles.button} >
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