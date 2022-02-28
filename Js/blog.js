// save our id to localStorage

const block = document.getElementById("blog_admin");

block.addEventListener("click", (e) => {
  e.preventDefault();
  let id = e.target.dataset.id;
  console.log(e.target.dataset.id);
  console.log(e.target.dataset.id);

  // if (e.target.className === "readme_button") {
  //   console.log("yes");
  // }

  const id_clicked = JSON.stringify(id);

  // save to localStorage
  let idSave = localStorage.setItem("id", id_clicked);

  if (id_clicked) {
    window.location.href = `../html/single_blog?id=${id_clicked}`;
  }
  //   //function to get inpu value

  //   function getInputValue(id) {
  //     return document.getElementById(id).value;
  //   }

  //   console.log("blog added successully");
});
