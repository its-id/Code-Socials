import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {

  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  const auth = useAuth();

  useEffect(()=> {

    const fetchUsers = async () => {
      const response = await searchUsers(searchText);

      if(response.success){
        setResults(response.data.users);
      }
    }

    if(searchText.length > 2)
      fetchUsers();
    else
      setResults([]);

  }, [searchText]); //as soon as the searchText input changes, useEffect willt take place and we do the call API

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to={'/'} className={styles.codeialLogo}>
          <img
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
            alt=""
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img className={styles.searchIcon} src='https://cdn-icons-png.flaticon.com/512/54/54481.png' alt='search-icon'/>
        <input placeholder='Search users' value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
      
        {results.length > 0 && <div className={styles.searchResults}>
            <ul>
              {results.map((user) => {
                return (<li className={styles.searchResultsRow} key={`user-${user._id}`}>
                  
                  <Link to={`/user/${user._id}`}>
                    <img src='https://cdn-icons-png.flaticon.com/512/1177/1177568.png' alt=''/>
                    <span>{user.name}</span>
                  </Link>
                
                </li>)
              })}
            </ul>
          </div>}
      
      </div>



      <div className={styles.rightNav}>
        {/* If user has logged in, then only we show this div */}
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn2.iconfinder.com/data/icons/essenstial-ultimate-ui/64/avatar-512.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Logout</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
