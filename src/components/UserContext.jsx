import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("session")));

  const betterSetUser = (user) => {
    setUser(user);
    if (user) {
      localStorage.setItem("session", JSON.stringify(user));
    } else {
      localStorage.removeItem("session");
    }
  };

  return (
    <UserContext.Provider value={[user, betterSetUser]}>
      {children}
    </UserContext.Provider>
  );
};

// const [user, setUser] = useUser()
export const useUser = () => useContext(UserContext);
