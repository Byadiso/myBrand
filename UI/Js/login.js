document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelectorAll(".login");
  const registerButton = document.querySelectorAll(".register");
  const registerForm = document.querySelector("#register_form");
  const loginForm = document.querySelector("#login_form");

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
    });
  });
});

console.log("yes we are on login page");
