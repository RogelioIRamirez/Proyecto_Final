const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Producer, KafkaClient } = require('kafka-node');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = [];

// Configuración de Kafka
const kafkaClientOptions = { kafkaHost: 'localhost:9092' };
const kafkaClient = new KafkaClient(kafkaClientOptions);
const producer = new Producer(kafkaClient);

producer.on('ready', () => {
  console.log('Productor de Kafka listo.');
});

producer.on('error', (err) => {
  console.error('Error en el productor de Kafka:', err);
});

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

  // Publica un mensaje en Kafka al registrar un nuevo usuario
  const newUserData = { username, message: 'Nuevo usuario registrado' };
  const payloads = [{ topic: 'registro-usuarios', messages: JSON.stringify(newUserData) }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error al enviar mensaje a Kafka:', err);
    } else {
      console.log('Mensaje enviado a Kafka:', data);
    }
  });

  res.json({ success: true, message: 'Registro exitoso' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ success: true, message: 'Inicio de sesión exitoso' });
  } else {
    res.status(401).json({ success: false, errorType: 'invalidCredentials', message: 'Credenciales incorrectas' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

