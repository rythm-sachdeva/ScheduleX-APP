import { create } from "zustand";
export type userDetails = {
id: number;
username:string;
email:string;
first_name:string;
last_name:string;
}

export interface IUserContext{
    userDetails:userDetails | null;
    setUserDetails:(details:userDetails | null) => void;
    fetchUserDetails: (token:string | null,url:string)=>Promise<void>;
}


export const useUserStore = create<IUserContext>((set) => ({

    userDetails:null,
    setUserDetails:(details:userDetails | null) => set({userDetails:details}),
    fetchUserDetails: async (token:string | null,url:string)=>{
        fetch(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((val)=>{
            val.json().then((value:userDetails)=>{
                set({userDetails: value})
            })
        })
    }



}));
