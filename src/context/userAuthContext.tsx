import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    type User,
} from "firebase/auth";
import { auth } from "../firebaseConfig.ts";

interface AuthContextType {
    user: User | null;
    googleSignIn: () => Promise<void>;
    logOut: () => Promise<void>;
    isLoading: boolean;
    isLogedIn:boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogedIn, setIsLogedIn] = useState(false);

    console.log(user,"Userin conetxthook")
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("Auth state restored:", currentUser);
            setIsLoading(false);
            setIsLogedIn(false)
        });
        return () => unsubscribe();
    }, []);

    const googleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(token,"Token")
                console.log(user,"USer")
                setUser(user)
                setIsLogedIn(true)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
              }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
              });
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    };

    const value = {
        user,
        googleSignIn,
        logOut,
        isLoading,
        isLogedIn
    };
    if (isLoading) {
        return <h1>Loading</h1 >; // Show a loading indicator while waiting for auth state
      }
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};