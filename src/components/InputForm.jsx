import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Stack,
  Paper,
  Grid,
} from "@mui/material";

export default function InputForm() {
  const [area, setArea] = useState("");
  const [vialidadPrincipal, setVialidadPrincipal] = useState("");
  const [vialidadSubtipo, setVialidadSubtipo] = useState("");
  const [tipoVialidad, setTipoVialidad] = useState(null);

  const [opciones, setOpciones] = useState({ D: false, E: false, F: false });
  const [accesibilidad, setAccesibilidad] = useState("FACIL");
  const [suelo, setSuelo] = useState("ACEPTABLE");
  const [pendiente, setPendiente] = useState("<5%");
  const [resultado, setResultado] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (vialidadPrincipal && vialidadSubtipo) {
      setTipoVialidad(`${vialidadPrincipal}${vialidadSubtipo}`);
    } else {
      setTipoVialidad(null);
    }
  }, [vialidadPrincipal, vialidadSubtipo]);


  const vialidadDescripciones = {
    primariaA: {
      titulo: "Vialidad Primaria A",
      descripcion: "Calles principales con alto flujo vehicular, conectan zonas importantes. Alta durabilidad y mantenimiento constante.",
      detalle: "Ideal para avenidas y bulevares con múltiples carriles. Incluye infraestructura robusta, semáforos, y señalización avanzada.",
      imagen: '/images/VPA.png',
    },
    primariaB: {
      titulo: "Vialidad Primaria B",
      descripcion: "Similares a las primarias A pero con un volumen de tráfico ligeramente menor o en áreas de transición.",
      detalle: "Puede tener carriles reducidos o menos intersecciones complejas. Diseñada para soportar cargas pesadas y uso continuo.",
      imagen: '/images/VPB.png',
    },
    secundariaA: {
      titulo: "Vialidad Secundaria A",
      descripcion: "Vías que distribuyen el tráfico desde las primarias a las zonas residenciales o comerciales. Flujo moderado.",
      detalle: "Generalmente de dos carriles por sentido, con menor infraestructura de señalización y semáforos. Enfoque en la eficiencia.",
      imagen: '/images/VSA.png',
    },
    secundariaB: {
      titulo: "Vialidad Secundaria B",
      descripcion: "Calles de uso local que conectan zonas residenciales y comerciales con las vías secundarias A. Flujo bajo-moderado.",
      detalle: "Normalmente con un carril por sentido, pueden tener zonas de estacionamiento. Orientadas a la accesibilidad local y seguridad de peatones.",
      imagen: '/images/VSB.png',
    },
    terciariaA: {
      titulo: "Vialidad Terciaria A",
      descripcion: "Calles residenciales o de baja afluencia vehicular, acceso a propiedades individuales. Priorizan la calma y seguridad.",
      detalle: "Predominantemente calles de un carril, con baja velocidad. Se prioriza la integración con el entorno y la vida comunitaria.",
      imagen: '/images/VTA.png',
    },
    terciariaB: {
      titulo: "Vialidad Terciaria B",
      descripcion: "Vías de servicio o en zonas rurales, con muy bajo tráfico y a menudo menos infraestructura. Pueden ser caminos no pavimentados.",
      detalle: "Generalmente para acceso específico, con mínimas características de ingeniería. Suelen ser caminos de tierra o empedrados.",
      imagen: '/images/VTB.png',
    },
  };

  const costosPorM2 = {
    primariaA: 928,
    primariaB: 1158,
    secundariaA: 452,
    secundariaB: 656,
    terciariaA: 374,
    terciariaB: 565,
  };

  const calcular = () => {
    if (!area || parseFloat(area) <= 0) {
      alert("Por favor ingresa un valor de área válido.");
      return;
    }
    if (!tipoVialidad || !costosPorM2[tipoVialidad]) {
      alert("Por favor selecciona un tipo de vialidad completo (categoría y tipo A/B).");
      return;
    }

    const A = parseFloat(area);
    const B = costosPorM2[tipoVialidad];
    const C = A * B;

    const G1 = opciones.D ? C * 0.163 : 0;
    const G2 = opciones.E ? C * 0.132 : 0;
    const G3 = opciones.F ? C * 0.06 : 0;

    const G = C + G1 + G2 + G3;

    const H1 = accesibilidad === "MEDIANO" ? G * 0.10 : accesibilidad === "DIFICIL" ? G * 0.20 : 0;
    const H = G + H1;

    const I1 = suelo === "EXCELENTE" ? -H * 0.05 : suelo === "MALA" ? H * 0.10 : 0;
    const I = H + I1;

    const J1 = pendiente === ">15%" ? I * 0.10 : 0;
    const J = I + J1; 

    setResultado(J.toFixed(2));
  };

  const manejarNuevoCalculo = () => {
    setArea("");
    setVialidadPrincipal("");
    setVialidadSubtipo("");
    setTipoVialidad(null);
    setOpciones({ D: false, E: false, F: false });
    setAccesibilidad("FACIL");
    setSuelo("ACEPTABLE");
    setPendiente("<5%");
    setResultado(null);
  };

  const descargarPDF = () => {
    if (!resultado) {
      alert("Por favor, calcula el costo primero antes de descargar el PDF.");
      return;
    }
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Cotización Paramétrica", 20, 20);

    doc.setFontSize(12);
    doc.text(`Tipo de vialidad: ${vialidadDescripciones[tipoVialidad]?.titulo || 'No especificado'}`, 20, 40);
    doc.text(`Área de calle: ${area} m²`, 20, 50);
    doc.text(`Costo base por m²: $${costosPorM2[tipoVialidad]}`, 20, 60);

    doc.text(`\nOpciones adicionales:`, 20, 80);
    doc.text(`- Banquetas: ${opciones.D ? "Sí" : "No"}`, 20, 90);
    doc.text(`- Drenaje Pluvial: ${opciones.E ? "Sí" : "No"}`, 20, 100);
    doc.text(`- Señalamientos: ${opciones.F ? "Sí" : "No"}`, 20, 110);

    doc.text(`\nCondiciones del terreno:`, 20, 130);
    doc.text(`- Accesibilidad: ${accesibilidad}`, 20, 140);
    doc.text(`- Calidad del suelo: ${suelo}`, 20, 150);
    doc.text(`- Pendiente: ${pendiente}`, 20, 160);

    doc.setFontSize(14);
    // Formatear el resultado en el PDF también
    doc.text(`\nCosto Total Estimado: $${parseFloat(resultado).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`, 20, 180);

    doc.save(`cotizacion_${tipoVialidad}.pdf`);
  };

  const manejarCerrarSesion = () => {
    alert("Sesión cerrada (simulado).");
    navigate("/");
  };

  const currentVialidadInfo = tipoVialidad ? vialidadDescripciones[tipoVialidad] : null;

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
      <Paper elevation={6} sx={{
        padding: "2rem",
        borderRadius: "8px",
        maxWidth: "1200px",
        width: '100%',
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, color: '#3d807e' }}>
          Cotizador de Vialidades
        </Typography>

        <Grid container spacing={4} sx={{ width: '100%' }}>
          {/* Columna Izquierda: Formulario de Cotización */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} sx={{ width: '100%', mb: 2 }}>
              <TextField
                id="area"
                name="area"
                label="Área (m²)"
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel id="vialidad-principal-label">Categoría de Vialidad</InputLabel>
                <Select
                  labelId="vialidad-principal-label"
                  id="vialidadPrincipal"
                  name="vialidadPrincipal"
                  value={vialidadPrincipal}
                  label="Categoría de Vialidad"
                  onChange={(e) => {
                    setVialidadPrincipal(e.target.value);
                    setVialidadSubtipo("");
                  }}
                >
                  <MenuItem value=""><em>Selecciona una categoría</em></MenuItem>
                  <MenuItem value="primaria">Primaria</MenuItem>
                  <MenuItem value="secundaria">Secundaria</MenuItem>
                  <MenuItem value="terciaria">Terciaria</MenuItem>
                </Select>
              </FormControl>

              {vialidadPrincipal && (
                <FormControl fullWidth>
                  <InputLabel id="vialidad-subtipo-label">Tipo A/B</InputLabel>
                  <Select
                    labelId="vialidad-subtipo-label"
                    id="vialidadSubtipo"
                    name="vialidadSubtipo"
                    value={vialidadSubtipo}
                    label="Tipo A/B"
                    onChange={(e) => setVialidadSubtipo(e.target.value)}
                  >
                    <MenuItem value=""><em>Selecciona un tipo</em></MenuItem>
                    <MenuItem value="A">Tipo A</MenuItem>
                    <MenuItem value="B">Tipo B</MenuItem>
                  </Select>
                </FormControl>
              )}

              <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                <FormControlLabel
                  control={<Checkbox id="banquetas" name="banquetas" checked={opciones.D} onChange={(e) => setOpciones({ ...opciones, D: e.target.checked })} />}
                  label="Banquetas"
                />
                <FormControlLabel
                  control={<Checkbox id="drenajePluvial" name="drenajePluvial" checked={opciones.E} onChange={(e) => setOpciones({ ...opciones, E: e.target.checked })} />}
                  label="Drenaje Pluvial"
                />
                <FormControlLabel
                  control={<Checkbox id="senalamientos" name="senalamientos" checked={opciones.F} onChange={(e) => setOpciones({ ...opciones, F: e.target.checked })} />}
                  label="Señalamientos"
                />
              </Box>

              <FormControl fullWidth>
                <InputLabel id="accesibilidad-label">Accesibilidad</InputLabel>
                <Select
                  labelId="accesibilidad-label"
                  id="accesibilidad"
                  name="accesibilidad"
                  value={accesibilidad}
                  label="Accesibilidad"
                  onChange={(e) => setAccesibilidad(e.target.value)}
                >
                  <MenuItem value="FACIL">Fácil</MenuItem>
                  <MenuItem value="MEDIANO">Mediano</MenuItem>
                  <MenuItem value="DIFICIL">Difícil</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="suelo-label">Calidad del suelo</InputLabel>
                <Select
                  labelId="suelo-label"
                  id="calidadSuelo"
                  name="calidadSuelo"
                  value={suelo}
                  label="Calidad del suelo"
                  onChange={(e) => setSuelo(e.target.value)}
                >
                  <MenuItem value="EXCELENTE">Excelente</MenuItem>
                  <MenuItem value="ACEPTABLE">Aceptable</MenuItem>
                  <MenuItem value="MALA">Mala</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="pendiente-label">Pendiente del terreno</InputLabel>
                <Select
                  labelId="pendiente-label"
                  id="pendienteTerreno"
                  name="pendienteTerreno"
                  value={pendiente}
                  label="Pendiente del terreno"
                  onChange={(e) => setPendiente(e.target.value)}
                >
                  <MenuItem value="<5%">Nivelado (&lt;5%)</MenuItem>
                  <MenuItem value="5-15%">Moderado (&gt;5% y &lt;15%)</MenuItem>
                  <MenuItem value=">15%">Elevado (&gt;15%)</MenuItem>
                </Select>
              </FormControl>

              {resultado && (
                <Typography variant="h6" textAlign="center">
                  {/* CAMBIO CLAVE AQUÍ: Formateo del número */}
                  Costo total estimado: ${parseFloat(resultado).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
                </Typography>
              )}

              <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#3d807e', '&:hover': { backgroundColor: '#2a5a58' } }}
                  onClick={calcular}
                >
                  Calcular costo
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: '#3d807e', borderColor: '#3d807e', '&:hover': { borderColor: '#2a5a58', color: '#2a5a58', backgroundColor: 'rgba(61, 128, 126, 0.04)' } }}
                  onClick={descargarPDF}
                >
                  Descargar PDF
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', mt: 2 }}>
                <Button
                  variant="text"
                  sx={{ color: '#3d807e', '&:hover': { color: '#2a5a58', backgroundColor: 'rgba(61, 128, 126, 0.04)' } }}
                  onClick={manejarNuevoCalculo}
                >
                  Nuevo Cálculo
                </Button>
                <Button
                  variant="text"
                  sx={{ color: '#3d807e', '&:hover': { color: '#2a5a58', backgroundColor: 'rgba(61, 128, 126, 0.04)' } }}
                  onClick={() => navigate("/")}
                >
                  Volver al Inicio
                </Button>
                <Button
                  variant="text"
                  sx={{ color: '#3d807e', '&:hover': { color: '#2a5a58', backgroundColor: 'rgba(61, 128, 126, 0.04)' } }}
                  onClick={manejarCerrarSesion}
                >
                  Cerrar Sesión
                </Button>
              </Box>
            </Stack>
          </Grid>

          {/* Columna Derecha: Descripciones de Vialidad */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              padding: "1rem",
              backgroundColor: '#3d807e',
              borderRadius: "8px",
              minHeight: { xs: '150px', md: '100%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              border: '1px solid #2a5a58',
              height: '100%',
              pt: 3
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#ffffff' }}>
                Detalles de Vialidad
              </Typography>
              {currentVialidadInfo ? (
                <>
                  <Typography variant="h6" sx={{ mt: 2, color: '#f0f2f5' }}>
                    {currentVialidadInfo.titulo}
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mt: 1, color: '#f0f2f5' }}>
                    Descripción Parcial: {currentVialidadInfo.descripcion}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2, color: '#e0e0e0' }}>
                    Descripción Detallada: {currentVialidadInfo.detalle}
                  </Typography>
                  {currentVialidadInfo.imagen && (
                    <img
                      src={currentVialidadInfo.imagen}
                      alt={`Imagen de ${currentVialidadInfo.titulo}`}
                      style={{ maxWidth: '100%', height: 'auto', marginTop: '1rem' }}
                    />
                  )}
                </>
              ) : (
                <Typography variant="body1" sx={{ mt: 2, color: '#e0e0e0' }}>
                  Selecciona un tipo y subtipo de vialidad para ver su descripción.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}