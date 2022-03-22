document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelectorAll(".login");
  const registerButton = document.querySelectorAll(".register");
  const registerForm = document.querySelector("#register_form");
  const loginForm = document.querySelector("#login_form");
  const password = document.querySelector('[name="password"]');
  const email = document.querySelector('[name="email"]');
  const name = document.querySelector('[name="name"]');
  const username = document.querySelector('[name="username"]');
  const alert_message_login = document.querySelector("#alert_message_login");
  const alert_message_register = document.querySelector(
    "#alert_message_register"
  );

  console.log("yes we are on login page");

  registerButton.forEach((button) => {
    let clickedNumber = 0;
    button.addEventListener("click", (e) => {
      console.log("let bring register form");
      clickedNumber = clickedNumber + 1;

      // order matter here
      registerForm.classList.remove("hide");
      loginForm.classList.add("hide");

      // check for empty values
      // checking if clicke then check below logic
      // console.log(clickedNumber > 1);
      if (clickedNumber > 1) {
        checkMyValue(email, password, alert_message_login);
        register();
        console.log("yess let register something");
      }
    });
  });

  loginButton.forEach((button) => {
    let clickedNumber = 0;
    button.addEventListener("click", (e) => {
      console.log("let bring login form");

      clickedNumber = clickedNumber + 1;

      // order matter here
      loginForm.classList.remove("hide");
      registerForm.classList.add("hide");
      console.log(e.target.value === "login");

      // checking if clicke then check below logic
      if (clickedNumber >= 1) {
        checkMyValue(email, password, alert_message_login);
        login();
      }
    });
  });

  // login logic

  // checking function

  const checkMyValue = (emailInput, passwordInput, messageBlock) => {
    if (!emailInput.value || !passwordInput.value) {
      console.log("first add something");
      if (!emailInput.value) {
        emailInput.style.border = "1px solid red";
        messageBlock.style.background = "red";
        messageBlock.innerHTML = "your email is missing";

        setTimeout(() => {
          messageBlock.style.display = "none";
        }, 3000);
      }
      if (!passwordInput.value) {
        passwordInput.style.border = "1px solid red";
        //   console.log((name.style.border = "1px solid red"));
        messageBlock.style.background = "red";
        messageBlock.innerHTML = "Your password is missing";

        setTimeout(() => {
          messageBlock.style.display = "none";
        }, 3000);
      }
    }

    if (emailInput.value && passwordInput.value) {
      console.log("let do login");
      return true;
    }
  };

  //Login logic from the Server

  const login = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    }).then((data) =>
      data
        .json()
        .then((user) => {
          if (user.token) {
            window.location.href = "../html/dashboard.html";
            let userLogged = localStorage.setItem(
              "token",
              JSON.stringify(user.token)
            );
          }
          if (user.error) {
            alert_message_login.innerHTML = user.error;
            alert_message_login.style.border = "1px solid red";
            alert_message_login.style.background = "red";
            console.log("yes there is an erro" + user.error);
            // console.log(email.value, password.value);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  // for register

  const register = () => {
    const password_register = document.querySelector(
      '[name="password-register"]'
    );
    const email_register = document.querySelector('[name="email-register"]');
    const name_register = document.querySelector('[name="name-register"]');
    const username_register = document.querySelector(
      '[name="username-register"]'
    );
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name_register.value,
        username: username_register.value,
        email: email_register.value,
        password: password_register.value,
      }),
    }).then((data) =>
      data
        .json()
        .then((user) => {
          if (user.message) {
            alert_message_register.innerHTML = user.message;
            alert_message_register.style.border = "1px solid red";
            alert_message_register.style.background = "green";
            // let userLogged = localStorage.setItem(
            //   "token",
            //   JSON.stringify(user.token)
            // );
          }
          if (user.error) {
            alert_message_register.innerHTML = user.error;
            alert_message_register.style.border = "1px solid red";
            alert_message_register.style.background = "red";
            console.log("yes there is an erro " + user.error);
            console.log(
              email_register.value + "is email value",
              "is passowr" + password_register.value
            );
          }
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };
});
