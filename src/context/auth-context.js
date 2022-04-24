import { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    setUser(response.user);
    return response.user;
  };

  const signup = (email, password) => {
    const response = createUserWithEmailAndPassword(auth, email, password);
    setUser(response.user);
    return response.user;
  };

  const signout = () => {
    return signOut(auth).then(() => {
      setUser(false);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (user) setUser(currentUser);
      else setUser(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
  };
}
