import React from 'react';
// Importar BrowserRouter, Route, y Switch de react-router-dom para la navegación
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importar hojas de estilo
import './App.css';

// Importar componentes
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Aquí podrías incluir componentes que siempre se renderizan, como una barra de navegación */}
        
        {/* El sistema de rutas maneja qué componente se debe renderizar según la URL */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          {/* Si ninguna ruta coincide, se muestra un componente para la página no encontrada (404) */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
