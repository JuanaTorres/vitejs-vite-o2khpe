import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLogin from './AppLogin';
import AppRegister from './AppRegister';
import EmailTest from './EmailTest';
import Adminpage from './Adminpage';
import Integrante from './Integrantes';
/**
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
*/
/**
 * Componente principal que redirecciona a las diferentes vistas, las cuales
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLogin />} />
        <Route path="/login" element={<AppLogin />} />
        <Route path="/register" element={<AppRegister />}/>
        <Route path="/capitan" element={<EmailTest />}
        />
        <Route path="/admin" element={<Adminpage />}
        />
        <Route path="/integrante" element={<Integrante />}
        />
      </Routes>
    </BrowserRouter>
  );
}
