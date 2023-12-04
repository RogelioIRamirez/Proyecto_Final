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
