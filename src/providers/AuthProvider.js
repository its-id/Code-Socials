import { createContext } from "react";
import { useProvideAuth } from "../hooks";

const initialState = {
    user: null,
    login: () => {},
    logout: () => {},
    loading: true, //will be checking if the user is being processed or not
}

export const AuthContext = createContext(initialState); 
//The Context in react is used to share data between nested components without passing it as props.



//wll be wrapping this over our main App component
export const AuthProvider = ({children}) => {
    const auth = useProvideAuth(); //using our custom hook.
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}