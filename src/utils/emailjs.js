import emailjs from "@emailjs/browser";

document.addEventListener("astro:page-load", () => {
    emailjs.init(import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY);
    document
      .getElementById("contact-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();

        emailjs
          .sendForm(import.meta.env.PUBLIC_EMAILJS_SERVICE_ID, import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID, e.target)
          .then(
            () => {
              console.log("Enviado");
            },
            (error) => {
              console.log("Error:", error.text);
            }
          );
      });
  });