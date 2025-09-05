import {createContext, useContext, useEffect, useState} from"react"
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, type User} from "firebase/auth"
import { auth } from "../firebaseConfig";
interface ChildrenType{
    children:React.ReactNode
}
type AuthContextData={
    user:User|null;
    logIn:typeof logIn;
    signup:typeof signup;
    logout:typeof logout;
    googleSignIn:typeof googleSignIn
}

const logIn=(email:string,password:string)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

const signup=(email:string,password:string)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}

const logout=()=>{
    signOut(auth)
}
const googleSignIn=()=>{
    const googleAuthProvider =new GoogleAuthProvider
    return signInWithPopup(auth,googleAuthProvider)
}
export const userAuthContext=createContext<AuthContextData>({
    user:null,
     logIn,
     signup,
     logout,
     googleSignIn
})
export const UserAuthProvide:React.FunctionComponent<ChildrenType>=({children})=>{
    const [user,setUser]=useState<User|null>(null);

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }
            return()=>{
                unsubscribe()
            }
        });
    });
    const value:AuthContextData={
     user, 
     logIn,
     signup,
     logout,
     googleSignIn
    };
    return (<userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>)
}

export const useUserAuth=()=>{
    return useContext(userAuthContext)
}