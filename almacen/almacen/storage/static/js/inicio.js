'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Base para redirecciones (proyectada desde Django en el <body>)
  const baseProductos = document.body.dataset.productos || '/productos/';

  // --- Botón "Buscar" ---
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const url = new URL(baseProductos, window.location.origin);
      // Si quieres pasar filtros desde los inputs:
      // const operacion = document.querySelector('.search-select')?.value || '';
      // const sector = document.querySelector('.search-input')?.value || '';
      // if (operacion) url.searchParams.set('operacion', operacion);
      // if (sector) url.searchParams.set('sector', sector);
      window.location.href = url.pathname + url.search; // relativo (sin host)
    });
  }

  // --- Botón "Buscar en Mapa" ---
  const mapBtn = document.querySelector('.map-btn');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      const url = new URL(baseProductos, window.location.origin);
      url.searchParams.set('view', 'map');
      window.location.href = url.pathname + url.search; // /productos/?view=map
    });
  }

  // --- Menú superior ---
  // IMPORTANTE: no interceptes los <a.nav-btn>, ya tienen href con {% url %}

  // --- Cities Section ---
  const section = document.querySelector('.cities-section');
  if (section) {
    // Accesible con teclado
    section.querySelectorAll('.city-card').forEach(card => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
    });

    const gotoCity = (card) => {
      const label = (card.querySelector('.city-image')?.textContent || card.textContent || '').trim();
      if (!label) return;
      const url = new URL(baseProductos, window.location.origin);
      url.searchParams.set('ciudad', label);
      window.location.href = url.pathname + url.search; // /productos/?ciudad=...
    };

    // Click por delegación (vale para cualquier hijo dentro del card)
    section.addEventListener('click', (e) => {
      const card = e.target.closest('.city-card');
      if (card) gotoCity(card);
    });

    // Teclado (Enter/Espacio)
    section.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.city-card');
        if (card) {
          e.preventDefault();
          gotoCity(card);
        }
      }
    });
  }
});

// === Carrusel ===
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const prev  = document.getElementById('prevBtn');
  const next  = document.getElementById('nextBtn');
  if (!track || !prev || !next) return;

  const slides = Array.from(track.children);
  if (!slides.length) return;

  let index = 0;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });

  prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  // Opcional: autoplay con pausa al pasar el mouse
  let autoplay;
  const start = () => { autoplay = setInterval(() => { next.click(); }, 5000); };
  const stop  = () => { clearInterval(autoplay); };
  // Respeta usuarios con "reducir movimiento"
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) start();
  track.closest('.carousel').addEventListener('mouseenter', stop);
  track.closest('.carousel').addEventListener('mouseleave', () => { if (!prefersReduced) start(); });

  // Asegura posición correcta si se redimensiona
  window.addEventListener('resize', update);
  update();
});

// === Alta de Propiedad (foto + precio + comuna) ===
document.addEventListener('DOMContentLoaded', () => {
  const form   = document.getElementById('form-propiedad');
  if (!form) return;

  const input  = document.getElementById('foto');
  const pick   = document.getElementById('btnPick');
  const drop   = document.getElementById('drop-zone');
  const prev   = document.getElementById('preview');
  const precio = document.getElementById('precio');
  const comuna = document.getElementById('comuna');
  const msg    = document.getElementById('form-msg');

  // helper CSRF
  const getCookie = (name) => {
    const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : null;
  };
  const csrftoken = getCookie('csrftoken');

  // abrir selector
  pick.addEventListener('click', () => input.click());
  // preview
  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    prev.src = url;
    prev.style.display = 'block';
    drop.classList.add('has-image');
  });

  // drag&drop
  ['dragenter','dragover'].forEach(ev => drop.addEventListener(ev, e => {
    e.preventDefault(); drop.classList.add('drag');
  }));
  ;['dragleave','drop'].forEach(ev => drop.addEventListener(ev, e => {
    e.preventDefault(); drop.classList.remove('drag');
  }));
  drop.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    input.files = e.dataTransfer.files; // asigna al input
    const url = URL.createObjectURL(file);
    prev.src = url; prev.style.display = 'block'; drop.classList.add('has-image');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    if (!input.files?.length) { msg.textContent = 'Sube una foto.'; return; }
    if (!precio.value)        { msg.textContent = 'Ingresa el precio.'; return; }
    if (!comuna.value)        { msg.textContent = 'Selecciona la comuna.'; return; }

    const fd = new FormData();
    fd.append('foto', input.files[0]);
    fd.append('precio', precio.value);
    fd.append('comuna', comuna.value);

    try {
      const res = await fetch('/api/propiedades/', {
        method: 'POST',
        headers: { 'X-CSRFToken': csrftoken },
        body: fd
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error('Error ' + res.status + ': ' + t);
      }
      const data = await res.json();
      msg.textContent = 'Guardado ✅';
      msg.classList.add('ok');

      // Inserta una card visual con lo subido (simple)
      const grid = form.closest('.property-grid');
      if (grid) {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
          <div class="property-image"><img src="${data.foto}" alt=""></div>
          <div class="property-info">
            <div class="property-price">Desde $${Number(data.precio).toLocaleString('es-CL')}</div>
            <div class="property-location">Bodega en Venta en<br>${data.comuna}</div>
          </div>`;
        grid.prepend(card);
      }

      // Resetea el formulario
      form.reset();
      prev.style.display = 'none';
      drop.classList.remove('has-image');
    } catch (err) {
      console.error(err);
      msg.textContent = 'No se pudo guardar. Revisa los datos o el tamaño de la imagen.';
      msg.classList.remove('ok');
    }
  });
});
