
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from '../src/pages/login'
import './App.css'
import Dashboard from './pages/dashboard';


function Layout() {
  // const location = useLocation();
  // const hideNavbarRoutes: string[] = ["/auth", "/profile"];
  // const hideNavbar = hideNavbarRoutes.includes(location.pathname);

   return (
    <>
      {/* {!hideNavbar && <Navbar/>} */}
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dashboard" element ={<Dashboard />}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
    <BrowserRouter> 
      <Layout/>
    </BrowserRouter>
    </>
  )
}

export default App;
