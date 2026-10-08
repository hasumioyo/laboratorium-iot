import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../src/pages/login'
import './App.css'
import Dashboard from './pages/dashboard';
import Inventaris from './pages/inventaris';
import TambahInventaris from './pages/tmbhInventaris';
import EditInventaris from './pages/editInventaris';
import ProtectedRoute from './protectedRoute';
import Pengguna from './pages/pengguna';
import EditPengguna from './pages/editPengguna';

import Layout from './layout';
import TambahPengguna from './pages/tmbhPengguna';

const App = () => {
  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route element={<ProtectedRoute  allowedLevels={["Admin"]}/>}>
                  <Route element={<Layout/>} >
                    <Route path="/pengguna" element ={<Pengguna />}/>
                    <Route path="/pengguna/tambah" element ={<TambahPengguna />}/>
                    <Route path="/pengguna/edit/:id" element={<EditPengguna/>}>
                  </Route>
          </Route>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route element={<Layout/>} >
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
