import emailjs from "@emailjs/browser";

document.addEventListener("astro:page-load", () => {
  const contactForm = document.getElementById("contact-form");

  emailjs.init(import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY);
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
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
            contactForm.reset();
          },
          (error) => {
            console.log("Error:", error.text);
          }
        );
    });
  }
});
