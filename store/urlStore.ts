import { IUrlContext } from '@/context/entity/urls.entity';
import { create } from 'zustand';



export const useUrlStore = create<IUrlContext>((set) => ({
  backendUrl: 'https://x17hwf7f-8001.inc1.devtunnels.ms/', 
}));


export const useConfig = () => {
  const backendUrl = useUrlStore((state) => state.backendUrl);
  return { backendUrl };
};