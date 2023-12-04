var users = [];

function submitForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Por favor, completa ambos campos.");
    } else {
        // Enviar los datos al servidor para el inicio de sesión
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Inicio de sesión exitoso. Redirigiendo a la encuesta...");
                
                // Enviar mensaje a Kafka
                enviarMensajeAKafka(`Inicio de sesión exitoso para ${username}`);
                
                window.location.href = "main_page.html";
            } else {
                alert("Error en el inicio de sesión: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error en el inicio de sesión. Inténtalo de nuevo más tarde.");
        });
    }
}

const kafka = require('kafka-node');

// Configuración para Kafka
const kafkaClientOptions = { kafkaHost: 'localhost:9092' };
const producer = new kafka.Producer(new kafka.KafkaClient(kafkaClientOptions));

// Manejadores de eventos para el productor
producer.on('ready', () => {
    console.log('Productor de Kafka listo para enviar mensajes.');

    // Llamada a la función para enviar mensajes
    enviarMensajeAKafka('Hola, Kafka!');
});

producer.on('error', (err) => {
    console.error('Error en el productor de Kafka:', err);
});

// Función para enviar mensajes a Kafka
function enviarMensajeAKafka(mensaje) {
    const payloads = [
        { topic: 'mi-topic', messages: mensaje },
    ];

    producer.send(payloads, (err, data) => {
        if (err) {
            console.error('Error al enviar mensaje a Kafka:', err);
        } else {
            console.log('Mensaje enviado a Kafka:', data);
        }

        // Cierra el productor después de enviar el mensaje
        producer.close(() => {
            console.log('Productor de Kafka cerrado.');
        });
    });
}


function registerUser() {
    var newUsername = document.getElementById("newUsername").value;
    var newPassword = document.getElementById("newPassword").value;

    if (newUsername === "" || newPassword === "") {
        alert("Por favor, completa todos los campos.");
    } else {
        // Enviar los datos al servidor
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername, password: newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                // Enviar mensaje a Kafka
                enviarMensajeAKafkaNuevoUser(`Inicio de sesión exitoso para ${newUsername}`);
            } else {
                if (data.errorType === 'userExists') {
                    alert("Error en el registro: El usuario ya existe.");
                } else {
                    alert("Error en el registro. Inténtalo de nuevo más tarde.");
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error en la solicitud al servidor. Inténtalo de nuevo más tarde.");
        });

    }
}

function enviarMensajeAKafkaNuevoUser(mensaje) {
    // Enviar mensaje al servidor para que lo publique en Kafka
    fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({ mensaje }),
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            console.error("Error al enviar mensaje a Kafka:", data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
