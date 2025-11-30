import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';
import { useUrlStore } from './urlStore';

// Define the shape of User Data
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

interface LinkedinAuthState {
  isLoading: boolean;
  userToken: string | null;
  userData: UserData | null; 

  // Actions
  exchangeCodeForToken: (authCode: string) => Promise<void>;
  handleDeepLink: (event: Linking.EventType) => void;
  parseLinkedInData: (url: string | null) => void;
  setUserData: (data: UserData) => Promise<void>; 
}

export const useLinkedInStore = create<LinkedinAuthState>((set, get) => ({
  isLoading: false,
  userToken: null,
  userData: null,

  exchangeCodeForToken: async (authCode: string) => {
    set({ isLoading: true });

    const backendUrl = useUrlStore.getState().backendUrl;

    try {
      const apiResponse = await fetch(`${backendUrl}/linkedin/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: authCode }),
      });

      const data = await apiResponse.json();

      if (apiResponse.ok) {
        await SecureStore.setItemAsync('linkedin_token', data.key);
        set({ userToken: data.key });
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'LinkedIn account connected successfully!'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: JSON.stringify(data) || 'Unable to authenticate.'
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: error.message || 'Something went wrong.'
      });
    } finally {
      set({ isLoading: false });
    }
  },

  handleDeepLink: (event: Linking.EventType) => {
    const url = event.url;
    get().parseLinkedInData(url);
  },

  parseLinkedInData: (url: string | null) => {
    if (!url) return;
    const parsed = Linking.parse(url);
    const { queryParams } = parsed;
    if (queryParams?.email && queryParams?.fname) {
      const userData: UserData = {
        firstName: queryParams.fname as string,
        lastName: queryParams.lname as string,
        email: queryParams.email as string,
        picture: queryParams.pic as string,
      };
      get().setUserData(userData);
    }
  },

  setUserData: async (data: UserData) => {
    set({ userData: data });
    try {
      await SecureStore.setItemAsync('linked_data', JSON.stringify(data));
      Toast.show({
        type: 'success',
        text1: `Welcome ${data.firstName}`,
      });
    } catch (error) {
      console.error("Error saving user data", error);
    }
  }
}));