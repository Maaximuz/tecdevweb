import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Importe o componente Login aqui
import Cadastro from './Cadastro';
import Principal from './Principal';

function App() {
  return (
      <Router>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/Cadastro" element={<Cadastro/>} />
            <Route path="/Principal" element={<Principal/>} />
          </Routes>
      </Router>
  );
}

export default App;
