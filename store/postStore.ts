import { create } from "zustand";


export interface IPostContext {
  
  postToSocialMedia: (caption: string,provider:string) => Promise<void>;
}

export const usePostStore = create<IPostContext>((set) => ({
  
    postToSocialMedia: async (caption: string,provider:string,) => {
        try {
            
        } catch (error) {
            
        }
    }


}));