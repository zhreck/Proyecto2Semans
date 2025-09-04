// static/js/publicar.js
(function () {
  "use strict";
  const onReady = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  onReady(() => {
    console.log("[publicar.js] cargado");
    const form = document.getElementById("form-prop");
    const msg  = document.getElementById("msg");
    if (!form || !msg) {
      console.warn("[publicar.js] Falta #form-prop o #msg");
      return;
    }

    const endpoint =
      form.dataset.endpoint && form.dataset.endpoint.trim()
        ? form.dataset.endpoint.trim()
        : "/api/propiedades/"; // fallback

    const getCSRF = () =>
      (form.querySelector('input[name="csrfmiddlewaretoken"]') || {}).value || "";

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.textContent = "Guardando…";

      const fd = new FormData(form);
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "X-CSRFToken": getCSRF() }, // NO pongas Content-Type manual
          body: fd,
        });

        if (!res.ok) {
          const body = await res.text().catch(() => "");
          console.error("[publicar.js] Error API", res.status, body);
          msg.textContent =
            res.status === 403
              ? "CSRF inválido. Refresca e intenta de nuevo."
              : res.status === 400
              ? "Datos inválidos (revisa comuna/precio/foto)."
              : "Error al guardar (" + res.status + ").";
          return;
        }

        const data = await res.json();
        console.log("[publicar.js] OK", data);
        msg.textContent = "Guardado ✅ ID " + (data.id ?? "?");

        // Si la API devolvió la URL de la foto, muéstrala debajo:
        if (data.foto) {
          let prev = document.getElementById("preview-guardado");
          if (!prev) {
            prev = document.createElement("img");
            prev.id = "preview-guardado";
            prev.style.display = "block";
            prev.style.maxWidth = "420px";
            prev.style.marginTop = "12px";
            msg.after(prev);
          }
          prev.src = data.foto; // absoluto si el backend manda request en contexto
        }

        form.reset();
      } catch (err) {
        console.error(err);
        msg.textContent = "Error de red.";
      }
    });
  });
})();
