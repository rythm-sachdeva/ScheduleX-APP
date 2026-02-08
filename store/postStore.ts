import Toast from "react-native-toast-message";
import { create } from "zustand";

export enum Provider {
    LinkedIn = 'linkedin',
    Twitter = 'twitter',
    Facebook = 'facebook',
    Instagram = 'instagram'
}
export enum Status{
        DRAFT = 'DRAFT',
        SCHEDULED = 'SCHEDULED',
        PUBLISHED = 'PUBLISHED',
        FAILED = 'FAILED',
        PROCESSING = 'PROCESSING'
}

export type SchduledPost = {
    id: string,
    author_username: string,
    social_account: number,
    social_account_provider: string,
    content: string,
    media_file: any,
    status: Status,
    scheduled_time: string,
    created_at: string,
    media_url: any
}

export interface IPostContext {
  postToSocialMedia: (caption: string,provider:string) => Promise<void>;
  scheduledPosts:SchduledPost[];
  fetchScheduledPosts: (token: string | null,url:string) => Promise<void>;
}

export const usePostStore = create<IPostContext>((set) => ({
   scheduledPosts:[],
    postToSocialMedia: async (caption: string,provider:string) => {
        try {
            
        } catch (error) {
            
        }
    },
    fetchScheduledPosts: async (token: string | null,url:string) => {
     try {
        fetch(url,{headers:{
            Authorization: `Bearer ${token}`
        }}).then((val)=>{
            val.json().then((value:SchduledPost[])=>{
                set({scheduledPosts:value})
            })
        })
        

     } catch (error) {
        console.log("Error fetching scheduled posts:", error);
        Toast.show({
            type: 'error',
            text1: 'Failed to fetch scheduled posts',
            text2: 'Please try again later.',
          });   
        
     }

    }
    



}));