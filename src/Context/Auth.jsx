import React, { useState, createContext, useContext, useEffect } from 'react';
import { message } from 'antd';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // 🔥 add kiya

const Auth = createContext();
const initialState = { isAuth: false, user: null };

export const AuthContext = ({ children }) => {
    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [isAppLoading, setIsAppLoading] = useState(true);

    const auth = getAuth();
    const navigate = useNavigate(); // 🔥 add kiya (ab kaam karega kyunki Router ke andar hai)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setState({ isAuth: true, user: { email: user.email, uid: user.uid } });
            } else {
                setState(initialState);
            }
            setIsAppLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleLogin = async (email, password) => {
        setIsLoading(true);
        try {
            console.log("Context matching credentials for:", email);
            const mockUser = { email: email, name: "Student" };
            setState({ isAuth: true, user: mockUser });
            message.success("Logged in successfully!");
            return true;
        } catch (error) {
            console.error(error);
            message.error("Login authentication process failed.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordUpdate = async (email, dob, password) => {
        setIsLoading(true);
        try {
            console.log("Context updating security structures for:", email, dob);
            message.success("Account password set up successfully!");
            return true;
        } catch (error) {
            console.error(error);
            message.error("Could not update account authentication parameters.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("user");
            setState(initialState);
            message.info("Logged out from system session.");
            navigate('/login'); // 🔥 login page pe redirect — path apne route ke mutabiq badal lena
        } catch (error) {
            console.error("Logout Error:", error);
            message.error("Logout failed.");
        }
    };

    return (
        <Auth.Provider value={{ ...state, isLoading, isAppLoading, handleLogin, handlePasswordUpdate, handleLogout }}>
            {children}
        </Auth.Provider>
    );
};

export default AuthContext;
export const useAuth = () => useContext(Auth);