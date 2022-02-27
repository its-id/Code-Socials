import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { editProfile, login as userLogin, register, fetchUserFriends } from '../api';
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
    const getUser = async () => {

      const userToken = gettItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      //is user exists, we decode the key to get the details of user
      if(userToken){
        const user = jwt(userToken);

        //fetch friends of user as well in local storage
        const response = await fetchUserFriends();

        let friends = []; //initially its empty

        if(response.success){
          friends = response.data.friends
        }

        //if friends exists, it will get filled above and gets updated for the user as well
        setUser({
          ...user,
          friends,
        })

      }

      setLoading(false);
    }

    getUser();
  }, []);

  const updateUser = async (userId, name, password, confirmPassword) => {

    const response = await editProfile(userId, name, password, confirmPassword);

    if(response.success){
      console.log('response=>', response);
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

  }

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

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // addFriend - is a bool. true means we want to add a friend, false means want to remove a friend
  // friend - 
  const updateUserFriends = (addFriend, friend) => {

    if(addFriend){
      setUser({
        ...user, 
        friends: [...user.friends, friend]
      });
      return;
    }

    //if coming at this line, means want to remove the friend
    const new_friends = user.friends.filter(f => f.to_user._id !== friend.to_user._id); //basically getting the rest of the friend except our friend obj which we removed
    
    setUser({
      ...user, 
      friends: new_friends
    });

  };

  return {
    login,
    logout,
    user,
    loading,
    signup,
    updateUser,
    updateUserFriends
  };
  
};
