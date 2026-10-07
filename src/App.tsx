import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../src/pages/login'
import './App.css'
import Dashboard from './pages/dashboard';
import Inventaris from './pages/inventaris';
import TambahInventaris from './pages/tmbhInventaris';
import EditInventaris from './pages/editInventaris';
import ProtectedRoute from './protectedRoute';

import Layout from './layout';

const App = () => {
  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route element={<ProtectedRoute/>}>
            <Route element={<Layout/>}>
              <Route path="/dashboard" element ={<Dashboard />}/>
              <Route path="/inventaris" element ={<Inventaris />}/>
              <Route path="/inventaris/tambah" element ={<TambahInventaris />}/>
              <Route path="/inventaris/edit/:id" element ={<EditInventaris />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
