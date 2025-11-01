import { ScheduleError } from '@/global/Error/error'
import * as SecureStore from 'expo-secure-store'

export const setToken = async(accessToken:string,refreshToken:string)=>{
    try {
       await SecureStore.setItemAsync('accessToken',accessToken)
       await SecureStore.setItemAsync('refreshToken',refreshToken)
    } catch (error) {
        throw new ScheduleError("Unable to set accessToken","setToken")
    }

}

export const getToken = async () : Promise<string | null | undefined>    =>{
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        return accessToken;
    } catch (error) {
        throw new ScheduleError("Unable to getToken","getToken")
    }
}

export const deleteToken = async () : Promise<void> => {
    try {
        await SecureStore.deleteItemAsync('accessToken')
        await SecureStore.deleteItemAsync('refreshToken')
    } catch (error) {
        throw new ScheduleError("Error While Deleting token","deleteToken")

    }
}