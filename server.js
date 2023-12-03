const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());  // Habilita CORS para todas las rutas

app.post('/register', (req, res) => {
  // Lógica de registro aquí
  res.json({ success: true, message: 'Registro exitoso' });
});

app.post('/login', (req, res) => {
  // Lógica de inicio de sesión aquí
  res.json({ success: true, message: 'Inicio de sesión exitoso' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
