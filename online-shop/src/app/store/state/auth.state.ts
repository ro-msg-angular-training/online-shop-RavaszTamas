import { User } from "src/app/auth/models/User.model";

export interface AuthState{
    user: User | null;
    hasAuthenticationError:boolean;
    message:string;
    isAuthenticated:boolean
}

export const initialAuthState: AuthState = {
    user: null,
    hasAuthenticationError:false,
    message:'',
    isAuthenticated:false
}