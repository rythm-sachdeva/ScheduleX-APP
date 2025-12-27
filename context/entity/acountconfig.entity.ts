export enum LinkedAccounts{
    GOOGLE = "google",
    MICROSOFT = "microsoft",
    APPLE = "apple",
    LINKEDIN = "linkedin"
}
export interface linkedAccount{    
    id: Number,
    provider: LinkedAccounts,
    uid: string,
    firstname: string,
    lastname: string
}



export interface IAccountConfigContext{
    linkedAccounts: linkedAccount[];
    setLinkedAccounts: (accounts: linkedAccount[])=> void;
    isLoading: boolean;
    fetchLinkedAccounts: ()=> Promise<void>;
}