import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";


import axios from "axios";
import { useEmployee } from "./context/EmployeeContext";
import Employees from "./components/Employees";
import Clients from "./components/Clients";
import Envio from "./components/Envios"
axios.defaults.baseURL='http://localhost:4000/api';


function App() {
  
  const { employee } = useEmployee();
  axios.defaults.headers.common['Authorization']= `Bearer ${employee.token}`;

  const Public = ({ children  }) => {
    return !employee ? children : <Navigate to="/Employees"/>
  };
  const Private = ({children})=>{
    return  employee ? children :<Navigate to="/" />;
  };

  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loginEmployee" element={
          <Public>
            <Login />
          </Public>
          } />
        <Route path="/register" element={
          <Private>
            <Register />
          </Private>
        } />
        <Route path="/Employees" element={
          <Private>
            <Employees />
          </Private>
        } />
        <Route path="/clients" element={
          <Private>
            <Clients />
          </Private>
        } />
        <Route path="/envio" element={
          <Private>
            <Envio />
          </Private>
        } />
        {/* <Route path="/pedido" element={<Pedido />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
