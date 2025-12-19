// Escucha el evento "submit" del formulario con id "Selectormaestro"
document.getElementById('Selectormaestro').addEventListener('submit', function(event) {

    // Evita que el formulario recargue la página automáticamente
    event.preventDefault();

    // Obtiene el valor seleccionado del elemento con id "Selectormaestro"
    const maestro = document.getElementById('Selectormaestro').value;

    // Si hay un maestro seleccionado...
    if (maestro) {

        // Guarda el maestro en localStorage
        localStorage.setItem('maestroSeleccionado', maestro);

        // Redirige a la página 2
        window.location.href = 'pagina2.html';
    } else {

        // Si no seleccionó nada, muestra un mensaje de alerta
        alert('Por favor, selecciona un maestro');
    }
});


// Función que guarda las respuestas del cuestionario y continúa a la siguiente página
function guardarYContinuar() {

    // Crea un arreglo vacío donde se guardarán los maestros seleccionados
    const Selectormaestro = [];

    // Si la opción 1 está marcada, agrega el valor del elemento con id "Lenny"
    if (document.getElementById('option1').checked) {
        Selectormaestro.push(document.getElementById('Lenny').value);
    }

    // Si la opción 2 está marcada, agrega el valor del elemento con id "Erika"
    if (document.getElementById('option2').checked) {
        Selectormaestro.push(document.getElementById('Erika').value);
    }

    // Si la opción 3 está marcada, agrega el valor del elemento con id "Freddy"
    if (document.getElementById('option3').checked) {
        Selectormaestro.push(document.getElementById('Freddy').value);
    }

    // Guarda las opciones en localStorage
    localStorage.setItem('respuestasCuestionario', JSON.stringify(Selectormaestro));

    // Redirige a la siguiente página
    window.location.href = 'resultados.html';
}
