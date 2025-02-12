import { createContext, useEffect, useState, useContext } from 'react';
import logic from './logic';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCurrentUser = async () => {
        if (logic.isUserLoggedIn() && !currentUser) {
            try {
                const user = await logic.getUsername();
                setCurrentUser(user);
            } catch (error) {
                alert('Error fetching current user:', error.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const logout = () => {
        logic.logoutUser();
        setCurrentUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                fetchCurrentUser,
                logout,
                isLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const ContextForUser = () => {
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error('Context for User must be used within a UserProvider');
    }
    return userContext;
};
