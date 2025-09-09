(function () {
  "use strict";

  // Ejecuta cuando el DOM está listo
  const ready = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  // Formateo rápido de CLP
  function formatMoney(n) {
    if (!n && n !== 0) return "";
    try {
      return new Intl.NumberFormat("es-CL").format(Number(n));
    } catch {
      return String(n);
    }
  }

  ready(() => {
    const form    = document.getElementById("form-prop");
    if (!form) return;

    const msg     = document.getElementById("msg");
    const btn     = document.getElementById("btn-guardar");
    const inputFt = document.getElementById("foto");
    const inputPx = document.getElementById("precio");
    const pvSpan  = document.getElementById("precio-preview");
    const preview = document.getElementById("preview-guardado");

    // Preview del precio en CLP
    if (inputPx && pvSpan) {
      inputPx.addEventListener("input", () => {
        pvSpan.textContent = inputPx.value ? `≈ $${formatMoney(inputPx.value)}` : "";
      });
    }

    // Preview local de la imagen seleccionada
    if (inputFt && preview) {
      inputFt.addEventListener("change", () => {
        if (inputFt.files && inputFt.files[0]) {
          const url = URL.createObjectURL(inputFt.files[0]);
          preview.src = url;
          preview.style.display = "block";
        } else {
          preview.removeAttribute("src");
          preview.style.display = "none";
        }
      });
    }

    // Envío del formulario a DRF
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (msg) { msg.textContent = ""; msg.style.color = "#ccc"; }

      // Validaciones básicas
      if (!inputFt || !inputFt.files || !inputFt.files[0]) {
        if (msg) msg.textContent = "Selecciona una foto.";
        return;
      }
      if (!inputPx || !inputPx.value) {
        if (msg) msg.textContent = "Ingresa el precio.";
        return;
      }

      const fd = new FormData(form);
      // Asegurar campo vistas por si no lo llenan
      if (!fd.get("vistas")) fd.set("vistas", "0");

      const csrf = form.querySelector('[name=csrfmiddlewaretoken]')?.value || "";
      const url  = form.dataset.endpoint; // {% url 'propiedad-list' %}

      if (btn) { btn.disabled = true; btn.dataset.oldText = btn.textContent; btn.textContent = "Guardando…"; }

      let resp, data;
      try {
        resp = await fetch(url, {
          method: "POST",
          headers: { "X-CSRFToken": csrf },
          body: fd
        });
      } catch (err) {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.oldText || "Guardar"; }
        if (msg) { msg.textContent = "Error de red. Revisa tu conexión."; msg.style.color = "#f88"; }
        return;
      }

      if (btn) { btn.disabled = false; btn.textContent = btn.dataset.oldText || "Guardar"; }

      // Mostrar resultado
      try { data = await resp.json(); } catch { data = null; }

      if (resp.ok) {
        if (msg) { msg.textContent = "Propiedad creada ✅"; msg.style.color = "#5bd68a"; }

        // Si el backend devuelve URL absoluta de la imagen (requiere get_serializer_context en ViewSet)
        if (data && data.foto && preview) {
          preview.src = data.foto;
          preview.style.display = "block";
        }

        // Reset de campos (mantiene preview si quieres dejarla)
        form.reset();
        if (pvSpan) pvSpan.textContent = "";
      } else {
        let detalle = "Error " + resp.status;
        if (data && typeof data === "object") {
          const partes = [];
          for (const k of Object.keys(data)) {
            const val = Array.isArray(data[k]) ? data[k].join(", ") : data[k];
            partes.push(`${k}: ${val}`);
          }
          if (partes.length) detalle = partes.join(" | ");
        }
        if (msg) { msg.textContent = detalle; msg.style.color = "#f88"; }
      }
    });
  });
})();
