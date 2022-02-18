import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, Login } from '../pages'; 
import { Loader, Navbar } from './';
import { useAuth } from '../hooks/index';

function App() {

  const auth = useAuth();
  const Page404 = () => {
    return (
      <div>
        <h1>Error 404. Page Not Found.</h1>  
      </div> 
    )
  }

  if(auth.loading){
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        {/* Earlier, we used to write Router and Switch to stop rendering multiple. */}
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />

          {/* If Nothing matches, we finally render 404 Page not found error. */}
          <Route path='*' element={<Page404/ >} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
