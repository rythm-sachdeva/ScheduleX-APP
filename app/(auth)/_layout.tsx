import { TabIcon } from '@/components/Navigation/TabsIcon'
import { icons } from '@/global/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
   <Tabs screenOptions={{tabBarShowLabel:false,tabBarItemStyle:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'

   },
   tabBarStyle:{
     backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
   }}}>
    <Tabs.Screen name='home' options={{title:'Home',headerShown:false,
      tabBarIcon: ({focused})=>{return <TabIcon focused={focused} icon={icons.home} title="Home"/>}
    }}/>
    <Tabs.Screen name='post' options={{title:'Post',headerShown:false,       tabBarIcon: ({focused})=>{return <TabIcon focused={focused} icon={icons.save} title="Post"/>}}} />
    <Tabs.Screen name='profile' options={{title:'Profile',headerShown:false ,       tabBarIcon: ({focused})=>{return <TabIcon  focused={focused} icon={icons.person} title="Profile"/>}}}/>a
   </Tabs>
  )
}

export default _layout