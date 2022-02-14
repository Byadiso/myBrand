document.addEventListener("DOMContentLoaded", () => {
  const burger_menu = document.querySelectorAll(".burger_menu");
  const small_nav = document.querySelectorAll(".menu_nav");

  burger_menu.forEach((button) => {
    button.addEventListener("click", (e) => {
      for (var i = 0; i < small_nav.length; i++) {
        small_nav[i].classList.remove("small_device");
        button.classList.add("hide_burger");
      }
    });
  });
});
