import emailjs from "@emailjs/browser";

document.addEventListener("astro:page-load", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  emailjs.init(import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY);

  const submitBtn = form.querySelector('button[type="submit"]');

  // Un único elemento de estado que se reutiliza en cada envío (antes se
  // agregaba un <p> nuevo por cada intento y se iban acumulando).
  const messageWrapper = document.createElement("div");
  messageWrapper.className =
    "message-wrapper h-10 w-full text-center font-bold uppercase lg:text-nowrap flex justify-center pt-6 text-xs lg:text-base relative";
  const message = document.createElement("p");
  message.className = "absolute";
  messageWrapper.appendChild(message);
  form.appendChild(messageWrapper);

  function showMessage(text, colorClass) {
    message.textContent = text;
    message.className = `absolute ${colorClass}`;
    // Forzar reflow para reiniciar la animación aunque el mensaje anterior siga visible
    void message.offsetWidth;
    message.classList.add("fadeInOut");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (submitBtn) submitBtn.disabled = true;

    try {
      await emailjs.sendForm(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        form
      );
      showMessage("Mensaje enviado.", "text-green-500");
      form.reset();
    } catch (error) {
      showMessage("Error al enviar mensaje.", "text-red-500");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});
