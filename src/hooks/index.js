import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin } from '../api';
import { setItemInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemLocalStorage, gettItemFromLocalStorage } from '../utils';
import jwt from 'jwt-decode';

export const useAuth = () => {
  return useContext(AuthContext);
}

export const useProvideAuth = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //as soon as the webpage loads, we make our user logged in if it exists
  useEffect(() => {
    const userToken = gettItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

    //is user exists, we decode the key to get the details of user
    if(userToken){
      const user = jwt(userToken);

      setUser(user);
    }

    setLoading(false);
  }, []);

  //will be using this login inside the login func in pages
  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if(response.success){
      setUser(response.data.user);
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null); //will be giving the token only if it exists in case of user logged in
      return{
        success: true
      }
    }else{
      return{
        success: false,
        message: response.message 
      }
    }

  };

  
  const logout = () => {
    setUser(null);
    removeItemLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  return {
    login,
    logout,
    user,
    loading,
  };
  
};
