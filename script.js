// ==== CONFIGURA AQUÍ TU URL DEL SCRIPT DE GOOGLE ====
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwJz6OvoBC5Y-HtXV3oTcAfUHjYgP9KGrzthN9RdwjMVMR6FGhDV75WTXGnd3Lo-Djh/exec";

const countdownEl = document.getElementById("countdown");
const launchDate = new Date("2025-11-22T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;
  
  if (diff <= 0) {
    countdownEl.textContent = "¡Es el día del lanzamiento musical! 🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `T = -${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown, 1000);

document.getElementById("sendBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  const song = document.getElementById("song").value;
  const statusEl = document.getElementById("status");

  if (!name || !message) {
    statusEl.textContent = "Por favor, llena tu nombre y mensaje.";
    return;
  }

  statusEl.textContent = "Enviando mensaje...";
  
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({ name, message, song }),
    });
    statusEl.textContent = "🎉 Mensaje enviado correctamente. ¡Gracias!";
  } catch (error) {
    statusEl.textContent = "❌ Error al enviar el mensaje.";
  }
});
