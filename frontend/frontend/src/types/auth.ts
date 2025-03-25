import { UserTokens } from "./user";

export type AuthTokens = {
    access: string;
    refresh: string;
}
  
  // Define the shape of your context data
export type AuthContextType ={ 
    user: UserTokens | null;
    authTokens: AuthTokens | null;
    setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokens | null>>;
    setUser: React.Dispatch<React.SetStateAction<UserTokens | null>>;
    loginUser: (data: AuthTokens) => void;
    logoutUser: () => void;
  }