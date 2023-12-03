function submitForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Por favor, completa ambos campos.");
    } else {
        // Aquí puedes redirigir al usuario a la página de la encuesta o realizar otras acciones.
        alert("Inicio de sesión exitoso. Redirigiendo a la encuesta...");
    }
}
