import styles from '../styles/login.module.css';
import { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  // console.log(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return toast.error('Please enter both Email and Password', {
        theme: 'colored',
      });
    }

    setLoggingIn(true);

    const response = await auth.login(email, password);
    console.log("Response****", response);
    if (response.success) {
      toast.success('Successfully Logged in!', {
        theme: 'colored',
      });
    } else {
      toast.error(`${response.message}`, {
        theme: 'colored',
      });
    }

    setLoggingIn(false);
  };

  if(auth.user){
    return <Navigate to='/' />
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging In..' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
