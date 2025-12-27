import { IAccountConfigContext, linkedAccount } from "@/context/entity/acountconfig.entity";
import { create } from "zustand";





export const useAccountConfigStore = create<IAccountConfigContext>((set) => ({
    linkedAccounts: [],
    isLoading: false,
    setLinkedAccounts: (accounts: linkedAccount[]) => set({ linkedAccounts: accounts }),
   fetchLinkedAccounts: async ()=>{},
}));
