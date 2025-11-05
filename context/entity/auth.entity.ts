export interface IAuthContext{
    signIn: (email:string,password:string)=> Promise<void>;
    signOut: ()=> Promise<void>;
    signUp: (data:ISignUpRequest)=> Promise<void>;
    session: string | null;
    isLoading: boolean;
}
export interface ISignUpRequest{
    username:string;
    email:string;
    password1:string;
    password2:string;
    first_name?:string;
    last_name?:string;
}

export interface ISignInRequest{
    email:string;
    password:string;
}


export interface IUserResponse{
    pk:number;
    first_name:string;
    last_name: string;
    username:string;
    email:string;
}
export interface ISignUpResponse{
    access:string;
    refresh:string;
    user:IUserResponse;
}
export interface ISigninResponse extends ISignUpResponse{
}