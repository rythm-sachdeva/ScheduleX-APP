import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';
import { useUrlStore } from './urlStore';

const DJANGO_BACKEND_URL = useUrlStore((state) => state.backendUrl);
interface LinkedinAuthState {
  isLoading: boolean;
  userToken: string | null;
  exchangeCodeForToken: (authCode: string) => Promise<void>;
}


export const useLinkedInStore = create<LinkedinAuthState>((set) => ({
  isLoading: false,
  userToken: null,

  exchangeCodeForToken: async (authCode: string) => {
    set({ isLoading: true });

    try {
      const apiResponse = await fetch(`${DJANGO_BACKEND_URL}/linkedin/connect`, {
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
}));

