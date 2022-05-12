import React, {useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, getAuth, User} from "firebase/auth";
const AuthContext = React.createContext<User | null>(null);

export function useAuth() {
    return useContext<User | null>(AuthContext);
}

export const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    getAuth().onAuthStateChanged((user) => {
        setCurrentUser(user)
    })

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    return (
     <AuthContext.Provider value={currentUser}>
         {!loading && children}
     </AuthContext.Provider>
 )
}