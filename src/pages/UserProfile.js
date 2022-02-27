import { useEffect, useState } from 'react';
import { useLocation, useParams, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addFriend, fetchUserProfile, removeFriendship } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';

import styles from '../styles/settings.module.css';

const UserProfile = () => {
  // const location = useLocation(); //will only display user profile, if we go by clicking on the user in homepage. Directly pasting the link of profile url will not work
  //by default, if no user given. we make it empty obj
  // const {user = {} } = location.state; //grabbing the user we passed in the state from home component.

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const auth = useAuth();
  // console.log('userId', userId);

  useEffect(() => {
    const getUser = async () => {
      
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(`${response.message}`, {
          theme: 'colored',
        });
        return Navigate('/');
      }
      setLoading(false);
    };

    getUser();
    
  }, [userId]);

  const checkIfUserisAFriend = () => {
    const friends = auth.user.friends;
    //map over the logged in user's friend and check if the profile he is visiting in matches id with any of the friend in the arr.

    const friendIds = friends.map((friend) => {
      return friend.to_user._id;
    }); //id lies inside friend obj -> to_user -> _id

    const index = friendIds.indexOf(userId);

    // console.log('index = ', index);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }

  };

  const handleRemoveFriendClick = async () => {

    setRequestInProgress(true);

    const response = await removeFriendship(userId);

    if(response.success){

      const friendship = auth.user.friends.filter((friend) => friend.to_user._id === userId); //will get the friend obj from the user's friendlist

      auth.updateUserFriends(false, friendship[0]); //filter returns an arr that's why getting obj inside of it by [0] index & giving false means we want to remove the friend from localstorage
      
      toast.success('Friend removed Successfully!', {
        theme: 'colored',
      });
      
    }else{
      toast.error(`${response.message}`, {
        theme: 'colored',
      });
    }

    setRequestInProgress(false);

  }

  const handleAddFriendClick = async () => {

    setRequestInProgress(true);

    const response = await addFriend(userId); //userId is being access from params

    if(response.success){
      const { friendship } = response.data; //will return us the friend object which is added
      
      // console.log('Add Friend->', response);

      auth.updateUserFriends(true, friendship);
      toast.success('Friend Added Successfully!', {
        theme: 'colored',
      });
    }else{
      toast.error(`${response.message}`, {
        theme: 'colored',
      });
    }

    setRequestInProgress(false);

  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://ca.slack-edge.com/T0266FRGM-U015ZPLDZKQ-gf3696467c28-512"
          alt="Logo"
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {!checkIfUserisAFriend() ? (
          <button className={`button ${styles.saveBtn}`} onClick={handleAddFriendClick} disabled={requestInProgress}>{requestInProgress ? 'Adding Friend...' : 'Add Friend'}</button>
        ) : (
          <button className={`button ${styles.saveBtn}`} onClick={handleRemoveFriendClick} disabled={requestInProgress}> {requestInProgress ? 'Removing Friend...' : 'Remove Friend'} </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
