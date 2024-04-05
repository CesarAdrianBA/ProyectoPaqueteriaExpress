import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";


import axios from "axios";
import { useEmployee } from "./context/EmployeeContext";
import Employees from "./components/Employees";
import Clients from "./components/Clients";
axios.defaults.baseURL='http://localhost:4000/api';


function App() {
  
  const { employee } = useEmployee();
  axios.defaults.headers.common['Authorization']= `Bearer ${employee.token}`;

  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loginEmployee" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Employees" element={<Employees />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/envio" element={<Envio />} />
        {/* <Route path="/pedido" element={<Pedido />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
