import emailjs from "@emailjs/browser";

document.addEventListener("astro:page-load", () => {
  emailjs.init(import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY);

  const form = document.getElementById("contact-form");
  const messageWrapper = document.createElement("div");
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
      "lg:text-base"
    );
    form.appendChild(messageWrapper);
    const message = document.createElement("p");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      emailjs
        .sendForm(
          import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
          import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
          e.target
        )
        .then(
          () => {
            console.log("Enviado");
            const message = document.createElement("p");
            message.textContent =
              "Gracias por contactarnos. En breve nos pondremos en contacto contigo.";
            message.classList.add("text-green-500");
            messageWrapper.appendChild(message);
            form.reset();
          },
          (error) => {
            console.log("Error:", error.text);
            message.textContent =
              "Error al enviar el formulario: " + error.text;
            message.classList.add("error", "text-red-500");
            messageWrapper.appendChild(message);
          }
        );
    });
  }
});
