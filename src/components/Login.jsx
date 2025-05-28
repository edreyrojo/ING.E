import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  TextField,
  Stack,
  Grid,
  Paper,
} from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejarLogin = () => {
    // Lógica de validación simulada
    if (email === "usuario@ejemplo.com" && password === "password123") {
      alert("Inicio de sesión exitoso!");
      navigate("/cotizador");
    } else if (email === "nuevo@ejemplo.com" && password === "nueva123") {
      alert("Simulación de registro exitoso, ahora puedes iniciar sesión!");
    } else {
      alert("Correo o contraseña incorrectos. Intenta con usuario@ejemplo.com / password123 para iniciar sesión.");
    }
  };

  const entrarComoInvitado = () => {
    navigate("/cotizador");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: '#f0f2f5',
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Lado Izquierdo: Información de Bienvenida */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{
            textAlign: { xs: 'center', md: 'left' },
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}>
            {/* CAMBIO AQUÍ: Color de "Bienvenido al Cotizador Paramétrico" */}
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#3d807e' }}>
              Bienvenido al Cotizador Paramétrico
            </Typography>
            <Typography variant="h6" paragraph sx={{ color: '#424242' }}>
              Esta herramienta te permitirá estimar el costo de una vialidad en base a
              parámetros técnicos y condiciones reales.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: '#616161' }}>
              Inicia sesión o regístrate para acceder a todas las funcionalidades, o continúa como invitado.
            </Typography>
          </Box>
        </Grid>

        {/* Lado Derecho: Formulario de Login/Registro */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={6} sx={{
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "400px",
            margin: { xs: 'auto', md: '0 0 0 auto' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
            {/* CAMBIO AQUÍ: Color de "Accede a tu cuenta" */}
            <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3, color: '#3d807e' }}>
              Accede a tu cuenta
            </Typography>

            <Stack spacing={2} sx={{ width: '100%' }}>
              <TextField
                id="email"
                name="email"
                label="Correo electrónico"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />

              <Button
                variant="contained"
                onClick={manejarLogin}
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: '#3d807e',
                  '&:hover': { backgroundColor: '#2a5a58' }
                }}
              >
                Iniciar Sesión
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/register")}
                fullWidth
                sx={{
                  color: '#3d807e',
                  borderColor: '#3d807e',
                  '&:hover': {
                    borderColor: '#2a5a58',
                    color: '#2a5a58',
                    backgroundColor: 'rgba(61, 128, 126, 0.04)'
                  }
                }}
              >
                Registrar Usuario
              </Button>
              <Button
                variant="text"
                onClick={entrarComoInvitado}
                fullWidth
                sx={{
                  color: '#3d807e',
                  '&:hover': {
                    color: '#2a5a58',
                    backgroundColor: 'rgba(61, 128, 126, 0.04)'
                  }
                }}
              >
                Entrar como invitado
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;