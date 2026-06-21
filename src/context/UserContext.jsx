import  { useState, createContext, useEffect} from "react";


export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


    // Function to update user data
    const updateUser = (userData) =>{
        setUser(userData);
    }

    // Function to clear user data (e.g., on logout)
    const clearUser = () => {
        setUser(null);
    }


    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;