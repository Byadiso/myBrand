document.addEventListener("DOMContentLoaded", () => {
  const requestButton = document.querySelectorAll(".request_button");
  const contactButton = document.querySelectorAll(".contact_button");
  const sendRequestButton = document.querySelector("#send_request");
  const requestForm = document.querySelector("#request_form");
  const contactForm = document.querySelector("#contact_form");
  const sender = document.querySelector('[name="sender"]');
  const email = document.querySelector('[name="email"]');
  const message = document.querySelector('[name="message"]');
  const SendErrorDisplay = document.querySelector("#SendErrorDisplay");

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

  sendRequestButton.addEventListener("click", (e) => {
    console.log("let send your request");

    const formData = new FormData();
    console.log(sender.value);
    console.log(message.value);
    console.log(email.value);
    formData.append("send", sender.value);
    formData.append("message", message.value);
    formData.append("email", email.value);

    if (!sender.value || !message.value || !email.value) {
      // sender.style.border = "1px solid red";
      // email.style.border = "1px solid red";
      console.log("first add something");
      if (!sender.value) {
        sender.style.border = "1px solid red";
        //   console.log((name.style.border = "1px solid red"));
      }

      if (!email.value) {
        email.style.border = "1px solid red";
      }
      if (!message.value) {
        message.style.border = "1px solid red";
      }
    }
    console.log(formData);
    if (sender.value && message.value && email.value) {
      sendMessage(formData);
      console.log(formData);
    }
  });

  const sendMessage = async (dataForm) => {
    console.log(dataForm);

    const response = await fetch(
      `https://mybrand-altp.herokuapp.com/api/v1/message/create`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        message: dataForm,
      }
    );
    const message = await response.json();

    if (message.error) {
      SendErrorDisplay.innerHTML = message.error;
    }
    return message;
  };
});

console.log("yes we are on contact  page");
