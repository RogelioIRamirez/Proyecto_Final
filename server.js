const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = [];

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Verifica si el usuario ya existe
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ success: false, errorType: 'userExists', message: 'El usuario ya existe' });
  }

  // Almacena la contraseña de manera segura
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Guarda el usuario y la contraseña en la matriz
  users.push({ username, password: hashedPassword });

  res.json({ success: true, message: 'Registro exitoso' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ success: true, message: 'Inicio de sesión exitoso' });

    // Aquí podrías generar y enviar un token de sesión al cliente
    // y realizar otras acciones relacionadas con el inicio de sesión.
  } else {
    res.status(401).json({ success: false, errorType: 'invalidCredentials', message: 'Credenciales incorrectas' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
