import { ScheduleError } from "@/global/Error/error";
import { createContext, useContext } from "react";
import { IUrlContext } from "./entity/urls.entity";



export const UrlsContext = createContext<IUrlContext| null>(null)

export const useConfig=():IUrlContext=>{
   const config = useContext(UrlsContext);
   if(!config)
   {
    throw new ScheduleError("Not Able to load Config Files","useConfig")
   }
   return config;
}
