document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelectorAll(".login");
  const registerButton = document.querySelectorAll(".register");
  const registerForm = document.querySelector("#register_form");
  const loginForm = document.querySelector("#login_form");
  const password = document.querySelector('[name="password"]');
  const email = document.querySelector('[name="email"]');

  console.log("yes we are on login page");

  registerButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("let bring register form");
      registerForm.classList.remove("hide");
      loginForm.classList.add("hide");
    });
  });

  loginButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("let bring login form");
      registerForm.classList.add("hide");
      loginForm.classList.remove("hide");

      if (!email.value || !password.value) {
        console.log("first add something");
        if (!email.value) {
          email.style.border = "1px solid red";
        }
        if (!password.value) {
          password.style.border = "1px solid red";
          //   console.log((name.style.border = "1px solid red"));
        }
      }
      if (email.value && password.value) {
        console.log("let do rogin");
        window.location.href = "../html/dashboard.html";
      }
    });
  });

  // login logic
});
