
// Funcionalidad básica para los botones
document.querySelector('.search-btn').addEventListener('click', function() {
        window.location.href = 'productos.html';
    });

document.querySelector('.map-btn').addEventListener('click', function() {
        window.location.href = 'productos.html?view=map';
    });

// Navegación a otras páginas
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.textContent === 'Acceder') {
            window.location.href = 'acceso.html';
        } else if (this.textContent === 'Ayuda') {
            window.location.href = 'ayuda.html';
        }
    });
});

// Funcionalidad para las tarjetas de ciudades
document.querySelectorAll('.city-card').forEach(card => {
    card.addEventListener('click', function() {
        const cityName = this.textContent;
        window.location.href = `productos.html?ciudad=${encodeURIComponent(cityName)}`;
    });
});
