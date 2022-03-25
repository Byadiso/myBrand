console.log("welcome to Edit logic");
document.addEventListener("DOMContentLoaded", () => {
  const updateBlogButton = document.getElementById("updateBlog");
  const mainDashboard = document.getElementById("main_dashboard");
  const form_blog = document.getElementById("form_blog");
  const blogAdmin = document.getElementById("blog_admin");
  const form = document.getElementById("form_blog");
  let token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  let blogsArray = [];
  let id = location.href.split("?id=")[1];
  let blogId = decodeURIComponent(id);

  const content = document.querySelector('[name="content"]');
  const title = document.querySelector('[name="title"]');
  const fileField = document.querySelector('input[type="file"]');

  //take me to edit page,
  let blogs = JSON.parse(localStorage.getItem("blogs"));
  blogsArray = [...blogsArray, blogs.blogs];

  let blogTobeEdited = blogsArray[0].filter((item) => item._id === blogId)[0];
  console.log(blogTobeEdited);

  updateBlogButton.addEventListener("click", (e) => {
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
      updateBlog(formData, token, blogId);
      // console.log(formData);
    }
  });

  const listAll = async () => {
    let response = await fetch("http://localhost:3000/api/v1/blogs");
    const blogs = await response.json();
    localStorage.setItem("blogs", JSON.stringify(blogs));
  };
  // console.log(listAll());
  listAll();

  //set content
  let photoUrl = `http://localhost:3000/api/v1/blog/photo/${blogId}`;
  content.innerHTML = blogTobeEdited.content;
  title.innerHTML = blogTobeEdited.title;
  console.log(fileField);
  fileField.file = photoUrl;

  const updateBlog = (form, token, id) => {
    fetch(`http://localhost:3000/api/v1/blogs/${id}`, {
      method: "PUT",
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
