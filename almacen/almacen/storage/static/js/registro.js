(function(){
  "use strict";

  const ready = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  function scorePassword(pw){
    if(!pw) return 0;
    let score = 0;
    const letters = {};
    for (let i=0; i<pw.length; i++) {
      letters[pw[i]] = (letters[pw[i]] || 0) + 1;
      score += 5.0 / letters[pw[i]];
    }
    const variations = {
      digits: /\d/.test(pw),
      lower:  /[a-z]/.test(pw),
      upper:  /[A-Z]/.test(pw),
      nonWords: /\W/.test(pw)
    };
    let variationCount = 0;
    for (let check in variations) variationCount += variations[check] ? 1 : 0;
    score += (variationCount - 1) * 10;
    score += Math.max(0, pw.length - 8) * 2; // premio por largo extra
    return parseInt(score, 10);
  }

  ready(()=>{
    const p1 = document.getElementById("id_password1");
    const p2 = document.getElementById("id_password2");
    const toggle1 = document.getElementById("toggle-p1");
    const toggle2 = document.getElementById("toggle-p2");
    const bar = document.getElementById("pw-bar");
    const text = document.getElementById("pw-text");
    const match = document.getElementById("pw-match");

    function updateStrength(){
      if(!p1 || !bar || !text) return;
      const s = scorePassword(p1.value);
      const pct = Math.max(0, Math.min(100, s));
      bar.style.width = pct + "%";
      let color = "#c44", label = "Débil";
      if (pct > 60) { color = "#e6c13d"; label = "Media"; }
      if (pct > 85) { color = "#4cc86a"; label = "Fuerte"; }
      bar.style.background = color;
      text.textContent = p1.value ? `Fuerza: ${label}` : "";
    }

    function updateMatch(){
      if(!p1 || !p2 || !match) return;
      if (!p2.value) { match.textContent = ""; return; }
      match.textContent = (p1.value === p2.value) ? "Coinciden ✓" : "No coinciden ✗";
      match.style.color = (p1.value === p2.value) ? "#5bd68a" : "#f88";
    }

    p1 && p1.addEventListener("input", ()=>{ updateStrength(); updateMatch(); });
    p2 && p2.addEventListener("input", updateMatch);

    toggle1 && toggle1.addEventListener("click", ()=>{
      if(!p1) return;
      p1.type = (p1.type === "password" ? "text" : "password");
      toggle1.textContent = (p1.type === "password" ? "Ver" : "Ocultar");
    });
    toggle2 && toggle2.addEventListener("click", ()=>{
      if(!p2) return;
      p2.type = (p2.type === "password" ? "text" : "password");
      toggle2.textContent = (p2.type === "password" ? "Ver" : "Ocultar");
    });

    updateStrength();
    updateMatch();
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const form  = document.querySelector("form[method='post']");
  if (!form) return;

  const p1    = document.getElementById("id_password1");
  const p2    = document.getElementById("id_password2");
  const terms = document.getElementById("id_terms");
  const btn   = document.getElementById("btn-registro");
  const match = document.getElementById("pw-match");

  function canSubmit() {
    const okTerms = terms ? terms.checked : true;
    const okPw    = p1 && p2 ? (p1.value && p1.value === p2.value) : true;
    return okTerms && okPw;
  }

  function updateBtn() {
    if (!btn) return;
    btn.disabled = !canSubmit();
  }

  p1 && p1.addEventListener("input", updateBtn);
  p2 && p2.addEventListener("input", updateBtn);
  terms && terms.addEventListener("change", updateBtn);
  updateBtn();

  form.addEventListener("submit", (e) => {
    if (!canSubmit()) {
      e.preventDefault();
      if (match && p1 && p2 && p1.value !== p2.value) {
        match.textContent = "Las contraseñas no coinciden ✗";
        match.style.color = "#f88";
      }
    }
  });
});
