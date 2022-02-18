document.addEventListener("DOMContentLoaded", () => {
  const requestButton = document.querySelectorAll(".request_button");
  const contactButton = document.querySelectorAll(".contact_button");
  const sendRequestButton = document.querySelectorAll(".send_request");
  const requestForm = document.querySelector("#request_form");
  const contactForm = document.querySelector("#contact_form");
  const name = document.querySelector('[name="name"]');
  const email = document.querySelector('[name="email"]');
  const message = document.querySelector('[name="message"]');
  console.log(name.value);

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

      if (!name.value || !message.value || !email.value) {
        // name.style.border = "1px solid red";
        // email.style.border = "1px solid red";
        console.log("first add something");
        if (!name.value) {
          name.style.border = "1px solid red";
          //   console.log((name.style.border = "1px solid red"));
        }

        if (!email.value) {
          email.style.border = "1px solid red";
        }
        if (!message.value) {
          message.style.border = "1px solid red";
        }
      }
    });
  });
});

console.log("yes we are on contact  page");
