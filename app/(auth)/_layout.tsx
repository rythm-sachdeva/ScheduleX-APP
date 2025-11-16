import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BAR_HEIGHT = 65;
const FAB_SIZE = 64;

type TabIconProps = {
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  focused: boolean

}


const TabIcon = ({icon,name,focused}:TabIconProps)=>{
  const color = focused ? '#3b82f6' : '#9ca3af';
  return (
    <View className='items-center justify-center' style={{top:Platform.OS === 'ios'? 10:0}}>
      <Ionicons name={icon} size={26} color={color} />
      <Text className='text-xs mt-1' style={{color:color}}>
       {name}
      </Text>
    
    </View>
  )
}

const _layout = () => {
  const insets = useSafeAreaInsets()
  const tabBarHeight = BAR_HEIGHT + insets.bottom
  return (
   <Tabs screenOptions={{tabBarShowLabel:false,tabBarItemStyle:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'

   },
   tabBarStyle:{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: tabBarHeight,
          paddingTop: 12,
          backgroundColor: '#020617', 
          borderTopWidth: 0,
          elevation: 0,
        }}}>
    <Tabs.Screen name='home' options={{title:'Home',headerShown:false,
      tabBarIcon: ({focused})=>{return <TabIcon focused={focused} icon="home-outline" name="Home"/>}
    }}/>
    <Tabs.Screen name='post' options={{title:'Post',headerShown:false,       tabBarIcon: ({focused})=>{return <TabIcon focused={focused} icon="cloud-upload-outline" name="Post"/>}}} />
    <Tabs.Screen name='profile' options={{title:'Profile',headerShown:false ,       tabBarIcon: ({focused})=>{return <TabIcon icon="person-outline" name="Profile" focused={focused} />}}}/>a
   </Tabs>
  )
}

export default _layout