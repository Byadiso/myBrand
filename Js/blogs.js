document.addEventListener("DOMContentLoaded", () => {
  const messageDiv = document.getElementById("header_message");
  const blogDiv = document.getElementById("blog_admin");
  const searchBar = document.getElementById("searchBar");
  const blogNumber = document.getElementById("blog_number");
  let blogs = [];

  //function to fetch all dat from backend

  const listAll = () => {
    return fetch("http://localhost:3000/api/v1/blogs")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        renderblog(data);
        localStorage.setItem("blogs", JSON.stringify(data));
      });
  };

  // function to render my blog
  function renderblog(data) {
    console.log(data);
    blogNumber.innerHTML = data.count;
    messageDiv.className = "err";
    // messageDiv.innerHTML = data.message;
    blogs = data.blogs;
    for (var i = 0; i < blogs.length; i++) {
      let content_elt = document.createElement("DIV");
      const { _id, title, content, createdAt } = blogs[i];

      // content = content.substr(0, 100);

      let photoUrl = `http://localhost:3000/api/v1/blog/photo/${_id}`;

      // for short  notation is the best
      var timestamp = timeDifference(new Date(), new Date(createdAt));
      content_elt.innerHTML = `<div class="blog_image blog" data-id=${_id}>
        <img src=${photoUrl} alt="blog image blog" data-id=${_id}>
      </div>
      <h3 class="blog" data-id=${_id}>${title}</h3>
      
      <p  data-id=${_id} class="readme_button blog">Read more..</p>
      `;

      // <p class="blog_title blog" data-id=${_id}>${content}</p>
      content_elt.setAttribute("class", "blog_item");
      content_elt.setAttribute("data-id", _id);

      // adding a class to my content_elt
      content_elt.setAttribute("class", "blog_item");

      // to append my whole create section
      blogDiv.append(content_elt);
    }

    const viewBtns = document.querySelectorAll(".btn-view");
    viewBtns.forEach((Btn) => {
      Btn.addEventListener("click", (e) => {
        // Storage()
        let propId = e.target.parentElement.dataset.id;
        localStorage.setItem("id", propId);
        console.log(propId);
        location.href = "../pages/singleblog.html";
      });
    });
  }

  // // implementing logOut
  // const logOutBtn = document.querySelector(".log-out");
  // logOutBtn.addEventListener("click", () => {
  //   console.log("plz I am out");
  //   localStorage.clear();
  //   window.location.href = "../pages/login.html";
  // });

  // addEventListener to my single blogs  save our id to localStorage

  blogDiv.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.dataset.id;

    if (e.target.className.includes("readme_button")) {
      console.log("yes");
      console.log(id);
      let idSave = localStorage.setItem("id", id);

      // window.location.href = "../html/single_blog.html";
      window.location.href = `../html/single_blog.html?id=${id}`;
    }

    // const id_clicked = JSON.stringify(id);

    // // save to localStorage
    // let idSave = localStorage.setItem("id", id_clicked);

    // if (id_clicked) {
    //   window.location.href = "../html/single_blog.html";
    // }
  });

  listAll();

  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      if (elapsed / 1000 < 30) return "Just now";

      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  }
});
