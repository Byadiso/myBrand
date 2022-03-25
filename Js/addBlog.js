console.log("welcome to dashboard");
document.addEventListener("DOMContentLoaded", () => {
  const addBlogButton = document.getElementById("addBlog");
  const mainDashboard = document.getElementById("main_dashboard");
  const form_blog = document.getElementById("form_blog");
  const blogAdmin = document.getElementById("blog_admin");
  const form = document.getElementById("form_blog");
  let token = JSON.parse(localStorage.getItem("token"));
  console.log(token);

  const content = document.querySelector('[name="content"]');
  const title = document.querySelector('[name="title"]');
  const fileField = document.querySelector('input[type="file"]');

  //take me to edit page, add blog page and delete handle

  addBlogButton.addEventListener("click", (e) => {
    console.log("yessss");
    const formData = new FormData();
    // const fileField = document.querySelector('[name="image"]');
    console.log(fileField.files[0] + "files");

    const blogText = tinymce.activeEditor.getContent();

    formData.append("title", title.value);
    formData.append("image", fileField.files[0]);
    formData.append("content", blogText);

    if (!title.value && !content.value) {
      console.log("there is no content");
    }

    if (title && content) {
      addBlog(formData, token);
      // console.log(formData);
    }
  });

  const addBlog = (form, token) => {
    fetch(`http://localhost:3000/api/v1/blog/create`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: form,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == true) {
          window.location.href = "../html/dashboard.html";
        }

        if (data.status == false) console.log(data.error);
      })
      .catch((err) => console.log(err));
  };
});
