export class ScheduleError extends Error{
    constructor(message:string,name:string)
    {
        super(message)
        this.name = name;
     if(Error.captureStackTrace)
     {
        Error.captureStackTrace(this,ScheduleError)
     }
    }
    
}