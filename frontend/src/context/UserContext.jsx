import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;

export { Context };
