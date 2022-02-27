import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';

const FriendsList = () => {
  const auth = useAuth();

  const { friends = [] } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {/* In case there is no friends */}
      {friends && friends.length === 0 && (
        <div className={styles.noFriends}>No Friends found!</div>
      )}

      {/* Else */}
      {friends &&
        friends.map((friend) => {
          return (
            <div key={`friend-${friend._id}`}>
              <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
                <div className={styles.friendsImg}>
                  <img
                    src="https://ca.slack-edge.com/T0266FRGM-U015ZPLDZKQ-gf3696467c28-512"
                    alt="Logo"
                  />
                </div>

                <div className={styles.friendsName}>{friend.to_user.email}</div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default FriendsList;
