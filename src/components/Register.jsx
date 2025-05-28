import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const manejarRegistroSimulado = () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (email && password) {
      alert(`Usuario ${email} registrado con éxito (simulado)!`);
      navigate("/"); // Redirige a la página principal (Login)
    } else {
      alert("Por favor, rellena todos los campos.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: '#f0f2f5',
      }}
    >
      <Paper elevation={6} sx={{ padding: "2rem", borderRadius: "8px", maxWidth: "400px", margin: "auto" }}>
        {/* CAMBIO: Color del título "Registra un Nuevo Usuario" */}
        <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3, color: '#3d807e' }}>
          Registra un Nuevo Usuario
        </Typography>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField
            id="reg-email"
            name="reg-email"
            label="Correo electrónico"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            id="reg-password"
            name="reg-password"
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <TextField
            id="reg-confirm-password"
            name="reg-confirm-password"
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
          />

          {/* CAMBIO: Botón "Registrar" */}
          <Button
            variant="contained"
            onClick={manejarRegistroSimulado}
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#3d807e', // Nuevo color de fondo
              '&:hover': { backgroundColor: '#2a5a58' } // Color al pasar el ratón
            }}
          >
            Registrar
          </Button>
          {/* CAMBIO: Botón "Volver al Inicio" */}
          <Button
            variant="text"
            onClick={() => navigate("/")}
            fullWidth
            sx={{
              color: '#3d807e', // Color del texto
              '&:hover': {
                color: '#2a5a58', // Color del texto al pasar el ratón
                backgroundColor: 'rgba(61, 128, 126, 0.04)' // Fondo sutil al pasar el ratón
              }
            }}
          >
            Volver al Inicio
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Register;