import { PublicKey } from "@solana/web3.js";
import { create } from "zustand";

export interface IWalletStore  {
    connecting : boolean | null;
    setConnecting : (connect:boolean) =>void;
    publicKey : PublicKey | null;
    setPublicKey: (key: PublicKey | null)=>void;
    isDevnet : boolean | null;
    setIsDevnet : (net:boolean) => void;
    connected: boolean;
    setConnected : (isConnected:boolean)=>void;
}


export const useWalletStore = create<IWalletStore>((set,get)=>({
    connecting:null,
    connected:false,
    setConnected:(isConnected:boolean)=>{
    set({connected:isConnected})
    },
    setConnecting : (connect:boolean)=>{
        set({connecting:connect});
    },
    publicKey: null,
    setPublicKey: (key:PublicKey | null)=>{
        set({publicKey:key});
    },
    isDevnet:null,
    setIsDevnet: (net:boolean)=>{
       set({isDevnet:net}); 
    }
}))