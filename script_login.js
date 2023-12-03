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
        // Aquí puedes agregar la lógica para almacenar el nuevo usuario
        // por ejemplo, podrías usar un array en memoria para este ejemplo
        var newUser = { username: newUsername, password: newPassword };
        users.push(newUser);

        alert("Registro exitoso. Ahora puedes iniciar sesión.");
    }
}