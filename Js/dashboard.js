console.log("welcome to dashboard");
document.addEventListener("DOMContentLoaded", () => {
  const addBlogMenu = document.getElementById("add");
  const mainDashboard = document.getElementById("main_dashboard");
  const form_blog = document.getElementById("form_blog");
  const blogAdmin = document.getElementById("blog_admin");
  const form = document.getElementById("form_blog");
  let token = JSON.parse(localStorage.getItem("token"));

  const name = document.querySelector('[name="name"]');
  const email = document.querySelector('[name="email"]');
  const message = document.querySelector('[name="message"]');

  // addBlogMenu.addEventListener("click", () => {
  //   mainDashboard.classList.add("hide");
  //   form_blog.classList.remove("hide");
  // });

  const fetchBlog = () => {
    return fetch("http://localhost:3000/api/v1/blogs")
      .then((resp) => resp.json())
      .then((data) => {
        renderblog(data);
      });
  };

  //take me to edit page, add blog page and delete handle

  blogAdmin.addEventListener("click", (e) => {
    if (e.target.className.includes("removeBlog")) {
      let id = e.target.dataset.id;
      console.log("yes delete" + id);
      let accept = alert("are you sure you want to delete this blog");
      console.log(accept);
      deleteBlog(id, token);
      // window.location.href = "../html/dashboard.html";
    }
    if (e.target.className.includes("editBlog")) {
      console.log("yes edit");
      let id = e.target.dataset.id;
      window.location.href = `../html/updateBlog.html?id=${id}`;
      // window.location.href = "../html/dashboard.html";
    }
  });
  const EditBlog = (id, token) => {
    if (!name.value.trim()) {
      display_error.textContent = "* Please fill in all fields";
    } else {
      const formData = new FormData();
      const fileField = document.querySelector('input[type="file"]');

      formData.append("name", title.value);
      formData.append("photo", fileField.files[0]);
      formData.append("price", content.value);

      fetch(`http://localhost:3000/api/v1/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status == true) {
            let storedData = localStorage.setItem(
              "blogs",
              JSON.stringify(data)
            );
            window.location.href = "../html/dashboard.html";
          }

          if (data.status == false) console.log(data.error);
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteBlog = (id, token) => {
    return fetch(`http://localhost:3000/api/v1/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        window.location.href = "../html/dashboard.html";
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const renderblog = (data) => {
    data = data.blogs;

    for (var i = 0; i < data.length; i++) {
      const { Image, title, _id } = data[i];
      console.log(Image);

      let photoUrl = `http://localhost:3000/api/v1/blog/photo/${_id}`;

      const content_elt = document.createElement("DIV");
      content_elt.innerHTML = `
          <div class="blog_image blog" data-id=${_id}>
            <img src=${photoUrl} alt="blog image blog" data-id=${_id}>
          </div>
            <h3 class="blog" data-id=${_id}>${title}</h3>
            <div class="dashboard_bottom">
          <i class="fa fa-trash admin_control_button removeBlog" id="removeBlog" data-id=${_id}></i><p class="removeBlog" data-id=${_id}>Delete</p>
          <i class="fa fa-edit admin_control_button editBlog" id="editBlog" data-id=${_id}></i><p class="editBlog" data-id=${_id}>Edit</p>
          </div>
          `;

      if (content_elt) {
        console.log("yeseee");
        const loading = document.getElementById("loading");
        loading.style.display = "none";
      }

      content_elt.setAttribute("class", "blog_item");
      content_elt.setAttribute("data-id", _id);
      blogAdmin.append(content_elt);
    }
  };

  fetchBlog();
});
