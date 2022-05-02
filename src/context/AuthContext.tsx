import React, {useContext, useState} from "react";
import { getAuth, User } from "firebase/auth";
const AuthContext = React.createContext<User | null>(null);

export function useAuth() {
    return useContext<User | null>(AuthContext);
}

export const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    getAuth().onAuthStateChanged((user) => {
        setCurrentUser(user)
    })

    return (
     <AuthContext.Provider value={currentUser}>
         {children}
     </AuthContext.Provider>
 )
}