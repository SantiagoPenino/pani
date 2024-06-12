import emailjs from "@emailjs/browser";

document.addEventListener("astro:page-load", () => {
  emailjs.init(import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY);

  const form = document.getElementById("contact-form");
  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("h-10");
  if (form) {
    messageWrapper.classList.add(
      "message-wrapper",
      "w-full",
      "text-center",
      "font-bold",
      "uppercase",
      "lg:text-nowrap",
      "flex",
      "justify-center",
      "pt-6",
      "text-xs",
      "lg:text-base",
      "relative"
    );
    form.appendChild(messageWrapper);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const message = document.createElement("p");
      message.classList.add("absolute", "fadeInOut");

      try {
        await emailjs.sendForm(
          import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
          import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
          e.target
        );

        message.textContent =
          "Gracias por contactarnos. En breve nos pondremos en contacto contigo.";
        message.classList.add("text-green-500");
        messageWrapper.appendChild(message);
        form.reset();
      } catch (error) {
        message.textContent = "Error al enviar el formulario: " + error.text;
        message.classList.add("text-red-500");
        messageWrapper.appendChild(message);
      }
    });
  }
});
