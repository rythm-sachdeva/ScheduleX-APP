import { useWalletStore } from "@/store/walletStore";
import {
    transact,
    Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import {
    clusterApiUrl,
    Connection,
    PublicKey
} from "@solana/web3.js";
import { useCallback } from "react";

export function useWallet(){
 const {publicKey,setPublicKey,connecting,setConnecting,isDevnet} = useWalletStore();

 const cluster = isDevnet ? "devnet" : "mainnet-beta";
 const connection = new Connection(clusterApiUrl(cluster),"confirmed");

 const APP_IDENTITY = {
  name: "ScheduleX",
  icon: "logo.png",
};

 const connect = useCallback(async ()=>{
    setConnecting(true);
    try{
      const authResult = await transact(async (wallet:Web3MobileWallet)=>{
        const result = await wallet.authorize({
            chain:`solana:${cluster}`,
            identity:APP_IDENTITY,
        });
        return result;
      });
      const pubkey =  new PublicKey(Buffer.from(authResult.accounts[0].address,"base64"));
      setPublicKey(pubkey);
      return pubkey;
    }catch(error:any)
    {
        console.error("Connection Error",error);
        throw error;
    }finally{
        setConnecting(false);
    }
 },[cluster])
const disconnect = useCallback(() => {
    setPublicKey(null);
  }, []);

  return {
    publicKey,
    connected : !!publicKey,
    connecting,
    connect,
    disconnect,
  }
}