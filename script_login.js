function submitForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Por favor, completa ambos campos.");
    } else {
        // Aquí puedes redirigir al usuario a la página de la encuesta o realizar otras acciones.
        alert("Inicio de sesión exitoso. Redirigiendo a la encuesta...");
        window.location.href = "main_page.html";
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
                alert("Error en el registro: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
