console.log("welcome to dashboard");
document.addEventListener("DOMContentLoaded", () => {
  const addBlogMenu = document.getElementById("add");
  const blogAdmin = document.getElementById("blog_admin");
  const form_blog = document.getElementById("form_blog");

  const name = document.querySelector('[name="name"]');
  const email = document.querySelector('[name="email"]');
  const message = document.querySelector('[name="message"]');

  addBlogMenu.addEventListener("click", () => {
    blogAdmin.style.display = "none";
    form_blog.classList.remove("hide");
  });
});
