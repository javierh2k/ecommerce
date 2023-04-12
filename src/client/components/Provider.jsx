import React, { createContext, useContext, useState } from "react";

const stateContext = createContext();

const StateProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    return (
        <stateContext.Provider value={{ items, setItems }}>
            {children}
        </stateContext.Provider>
    );
};

const useStateContext = () => {
    const context = useContext(stateContext);
    if (!context) {
        throw new Error("usestateContext must be used within StateProvider");
    }
    return context;
};

export { StateProvider, useStateContext };
