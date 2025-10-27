document.getElementById('Selectormaestro').addEventListener('submit', function(event) {
    event.preventDefault();

    const maestro = document.getElementById('Selectormaestro').value;
    if (maestro) {
        localStorage.setItem('maestroSeleccionado', maestro);
        window.location.href = 'pagina2.html';
    } else {
        alert('Por favor, selecciona un maestro');
    }
});

function guardarYContinuar() {
    const Selectormaestro = [];
    if (document.getElementById('option1').checked) {
        Selectormaestro.push(document.getElementById('Liliana').value);
    }
    if (document.getElementById('option2').checked) {
        Selectormaestro.push(document.getElementById('Erica').value);
    }
    if (document.getElementById('option3').checked) {
        Selectormaestro.push(document.getElementById('Fredy').value);
    }

    // Guarda las opciones en localStorage
    localStorage.setItem('respuestasCuestionario', JSON.stringify(Selectormaestro));

    // Redirige a la siguiente página
    window.location.href = 'resultados.html';
}
