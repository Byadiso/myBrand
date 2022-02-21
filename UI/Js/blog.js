// save our id to localStorage

const block = document.getElementById("blog_admin");

block.addEventListener("click", (e) => {
  e.preventDefault();
  let id = e.target.dataset.id;
  console.log(e.target.dataset.id);

  //   if (e.target.classList === "readme_button") {
  //     console.log("yes");
  //   }

  const id_clicked = JSON.stringify(id);

  // save to localStorage
  localStorage.setItem("id", id_clicked);

  //   //function to get inpu value

  //   function getInputValue(id) {
  //     return document.getElementById(id).value;
  //   }

  //   console.log("blog added successully");
});
