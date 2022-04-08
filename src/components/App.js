import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, Login, Register, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks/index';

function PrivateRoute({ children }){ //children - will contain the components to be rendered. Ex: Login, Register, Settings, rest - simply contains props to be given to the children

  const auth = useAuth();
  
  return auth.user ? children : <Navigate to='/login' />;
    //same as the other way of rendering a component like in the main App div route
}

function App() {
  
  const auth = useAuth();
  console.log(auth);

  const Page404 = () => {
    return (
      <div>
        <h1>Error 404. Page Not Found.</h1>
      </div>
    );
  };


  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />  
        {/* Earlier, we used to write Router and Switch to stop rendering multiple. */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />
          <Route exact path="/user/:userId" element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          } />
          {/* If Nothing matches, we finally render 404 Page not found error. */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
