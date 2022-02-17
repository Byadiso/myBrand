document.addEventListener("DOMContentLoaded", () => {
  const requestButton = document.querySelectorAll(".request_button");
  const contactButton = document.querySelectorAll(".contact_button");
  const sendRequestButton = document.querySelectorAll(".send_request");
  const requestForm = document.querySelector("#request_form");
  const contactForm = document.querySelector("#contact_form");
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");

  contactButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("let bring contact form");
      contactForm.classList.remove("hide");
      requestForm.classList.add("hide");
    });
  });

  requestButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("let bring request form");
      contactForm.classList.add("hide");
      requestForm.classList.remove("hide");
    });
  });

  // send a request feature

  sendRequestButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("let send your request");
      const nameInput = document.querySelector("input#name");
      console.log(name.value);
      //   if (!name.value || !message.value || !email.value) {
      //     console.log("first add something");
      //     if (!name.value) {
      //       name.classList.add("error_message");
      //       nameInput.style.border = "border: 1px solid red";
      //     }
      //   }
    });
  });
});

console.log("yes we are on contact  page");
