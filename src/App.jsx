import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/Login';
import InputForm from './components/InputForm';
import Register from './components/Register'; // ¡Importa el nuevo componente!

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f2f5', // Un gris claro suave para la página completa
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cotizador" element={<InputForm />} />
          <Route path="/register" element={<Register />} /> {/* ¡Nueva ruta para el registro! */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;