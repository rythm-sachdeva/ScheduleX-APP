import { create } from "zustand";

interface DateStore{
    date: Date | null,
    setDate:(dt: Date)=> void
    openDatePicker: boolean,
    setOpenDatePicker:(open: boolean)=> void
}
export const useDateStore = create<DateStore>((set,get)=>({
    date:null,
    setDate:(dt: Date | null)=>{
        set({date:dt});
    },
    openDatePicker:false,
    setOpenDatePicker:(open: boolean)=>{
        set({openDatePicker:open});
    }

}))