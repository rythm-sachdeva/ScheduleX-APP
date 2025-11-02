import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Stack>
     <Stack.Screen name="signup" options={{title:"signup", headerShown:false}}/>
     <Stack.Screen name="signin" options={{title:"Profile", headerShown:false}}/>
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})