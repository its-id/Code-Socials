import styles from '../styles/login.module.css';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  const navigate = useNavigate();

  const auth = useAuth();
  // console.log(auth);
  // console.log(navigate);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast.error(`Please enter all the fields!`, {
        theme: 'colored',
      });
      error = true;
    }

    if (password !== confirmPassword) {
      toast.error(`Password & Confirm Password doesn't match!`, {
        theme: 'colored',
      });
      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    // console.log("Response****", response);
    if (response.success) {
        navigate('/login'); //will help us to redirect to login page after registering in form of a stack
        setSigningUp(false);
        return toast.success('Successfully Registered!', {
            theme: 'colored',
        });
    } else {
      toast.error(`${response.message}`, {
        theme: 'colored',
      });
    }

    setSigningUp(false);

  };

  //we don't want to show this page is user is already signed in
  if(auth.user){
    return <Navigate to='/' />
  }

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
  );
};

export default Register;
