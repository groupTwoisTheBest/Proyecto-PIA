// Escucha el evento "submit" del formulario con id "Selectormaestro"
document.getElementById('Selectormaestro').addEventListener('submit', function(event) {

    // Evita que el formulario recargue la página automáticamente
    event.preventDefault();

    // Obtiene el valor seleccionado del elemento con id "Selectormaestro"
    const maestro = document.getElementById('Selectormaestro').value;

    // Verifica si el usuario seleccionó un maestro
    if (maestro) {

        // Guarda el maestro seleccionado en el almacenamiento local del navegador
        localStorage.setItem('maestroSeleccionado', maestro);

        // Redirige a la siguiente página del flujo
        window.location.href = 'pagina2.html';
    } else {

        // Si no seleccionó nada, muestra un mensaje de alerta
        alert('Por favor, selecciona un maestro');
    }
});