import { IAuthContext, ISigninResponse, ISignUpResponse } from "@/context/entity/auth.entity";
import { ScheduleError } from "@/global/Error/error";
import { deleteToken, getToken, setToken } from "@/utils/token";
import axios from "axios";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { create } from 'zustand';
import { useConfig } from "./urlStore";
const router = useRouter();
const backendUrl = useConfig().backendUrl;
export const useAuthStore = create<IAuthContext>((set) => ({
  session: null,
  isLoading: false,
  setSession: (token: string | null) => set({ session: token }),


  signIn: async (email, password) => {
    const data = { email, password };
    set({ isLoading: true });

    try {
      const response = await axios.post<ISigninResponse>(
        `${backendUrl}api/auth/login/`,
        data
      );

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: "Signed in Successfully",
        });

        const { access, refresh } = response.data;
        
        // 1. Persist token
        await setToken(access, refresh);
        
        // 2. Update State
        set({ session: access });

        // 3. Navigate
        router.replace('/(auth)/home'); 
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'SignIn failed',
        text2: String(error),
      });
      throw new ScheduleError("Error While Signing In", "signIn");
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (data) => {
    set({ isLoading: true });

    try {
      const response = await axios.post<ISignUpResponse>(
        `${backendUrl}api/auth/registration/`,
        data
      );

      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Account created successfully',
        });

        const { access, refresh } = response.data;

        await setToken(access, refresh);
        set({ session: access });
        
        router.replace('/(auth)/home');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'SignUp failed',
        text2: String(error),
      });
      throw new ScheduleError("Error While SigningUp", "signup");
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await deleteToken();
      set({ session: null }); 
      router.replace('/(auth)/home'); 
    } catch (error) {
      console.error("Sign out error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadSession: async () => {
    set({ isLoading: true });
    try {
      const token = await getToken();
      if (token) {
        set({ session: token.accessToken });
      }
    } catch (error) {
        console.error("Failed to load session", error);
    } finally {
        set({ isLoading: false });
    }
  },
  getAccessToken : async ()=>{
    getToken().then((tokenObj) => {
          if (tokenObj.refreshToken) {
            
           const refreshToken = tokenObj.refreshToken;
           if(!refreshToken){
            router.replace('/(app)/signin');
            return;
           }
           fetch("https://x17hwf7f-8001.inc1.devtunnels.ms/api/token/refresh/",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
           })
            .then(response => response.json())
            .then(data => {
              if (data.access) {
                set({ session: data.access });
                return data.access;
              }
            }).catch((error) => {
              Toast.show({
                type: 'error',
                text1: 'Session Error',
                text2: 'Please sign in again.',
              })
              router.replace('/(app)/signin');
            });
          }
        });
  }
}));