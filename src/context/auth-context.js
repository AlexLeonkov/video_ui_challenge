import { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBfZvKfpp8ESiZX7KbYENqafIfiVdxbLm4",
    authDomain: "video-ui-b02ae.firebaseapp.com",
    projectId: "video-ui-b02ae",
    storageBucket: "video-ui-b02ae.appspot.com",
    messagingSenderId: "893151521918",
    appId: "1:893151521918:web:64ef7b16e2314b6f61bc2f",
};

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
    const response = await signInWithEmailAndPassword(auth, email, password)
    setUser(response.user);
    return response.user;
  };

  const signup = (email, password) => {
    const response =  createUserWithEmailAndPassword(auth, email, password)
    setUser(response.user);
    return response.user;
  };

  const signout = () => {
    return signOut(auth)
      .then(() => {
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