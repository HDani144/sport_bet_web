import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUser({ name: storedName });
  }, []);

  const login = (name) => {
    localStorage.setItem("userName", name);
    setUser({ name });
  };

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
