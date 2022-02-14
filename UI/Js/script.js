document.addEventListener("DOMContentLoaded", () => {
  const burger_menu = document.querySelectorAll(".burger_menu");
  const small_nav = document.querySelectorAll(".menu_nav");

  console.log("We are going to click my burger menu");
  burger_menu.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("click my burger menu");
      for (var i = 0; i < small_nav.length; i++) {
        small_nav[i].classList.remove("small_device");
      }
    });
  });
});
