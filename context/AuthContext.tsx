import { ScheduleError } from '@/global/Error/error';
import { createContext, useContext } from 'react';
import { IAuthContext } from './entity/auth.entity';

export const AuthContext = createContext<IAuthContext| null>(null)

export const useAuth = () => {
 const context = useContext(AuthContext);
 if(!context){
    throw new ScheduleError("Use Auth must be within auth provider","USEAUTH");
 }
}