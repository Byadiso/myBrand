document.addEventListener("DOMContentLoaded", () => {
  const messageDiv = document.getElementById("header_message");
  const blogDiv = document.getElementById("blog_item_content");

  let data = { ...JSON.parse(localStorage.getItem("data")) };
  let blogId = localStorage.getItem("id");

  console.log(blogId);

  let array = [];

  array = [...array, data];

  const blog_item_content = document.querySelector("#blog_item_content");
  let blog_single = document.createElement("DIV");

  const listBlog = () => {
    return fetch(`http://localhost:3000/blogs/${blogId}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        renderblog(data);
        localStorage.setItem("blog", JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  };

  listBlog();
  // function to render my blog
  function renderblog(data) {
    console.log(data);
    // messageDiv.className = "err";
    // messageDiv.innerHTML = data.message;
    // blog = data.blog;

    // let content_elt = document.createElement("DIV");
    // const { _id, title, content, description, createdAt } = blog;

    // let photoUrl = `http://localhost:3000/blog/photo/${_id}`;

    // // for short  notation is the best
    // var timestamp = timeDifference(new Date(), new Date(createdAt));
    // content_elt.innerHTML = `<div class="blog_image blog" data-id=${_id}>
    //   <img src=${photoUrl} alt="blog image blog" data-id=${_id}>
    // </div>
    // <h3 class="blog" data-id=${_id}>${title}</h3>
    // <p class="blog_title blog" data-id=${_id}>${content}</p>
    // <p  data-id=${_id} class="readme_button blog">Read more..</p>
    // `;

    // content_elt.setAttribute("class", "blog_item");
    // content_elt.setAttribute("data-id", _id);

    // // adding a class to my content_elt
    // content_elt.setAttribute("class", "column-grid-blog");

    // // to append my whole create section
    // blogDiv.append(content_elt);

    // const viewBtns = document.querySelectorAll(".btn-view");
    // viewBtns.forEach((Btn) => {
    //   Btn.addEventListener("click", (e) => {
    //     // Storage()
    //     let propId = e.target.parentElement.dataset.id;
    //     localStorage.setItem("id", propId);
    //     console.log(propId);
    //     location.href = "../pages/singleblog.html";
    //   });
    // });
  }

  // addEventListener to my single blog  save our id to localStorage

  blogDiv.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.dataset.id;

    if (e.target.className.includes("readme_button")) {
      console.log("yes");
      console.log(id);
      let idSave = localStorage.setItem("id", id_clicked);
      if (idSave != undefined) {
        window.location.href = "../html/single_blog.html";
      }
    }
  });
});

// let blog = array.find((item) => {
//   for (var [key, value] of Object.entries(item)) {
//     console.log("this is the " + value.id_key);

//     if (parseInt(value.id) === parseInt(blogId)) {
//       blog_single.innerHTML = `
//       <div class="blog_item_content" data-id=${key}>

//       <div class="single_blog_image">
//         <img
//           src=${value.Image}
//           alt="photo_blog"
//         />
//       </div>
//       <div class="icon_blog">
//         <p><i class="fa fa-heart"></i>Like</p>
//         <p><i class="fa fa-comment"></i>comment</p>

//         <p><i class="fa fa-trash admin_control_button" id="removeBlog" data-id=${value.id_key}></i></p>
//         <p><i class="fa fa-edit admin_control_button" id="editBlog" data-id=${value.id_key}></i></p>
//      </div>

//       <h3 class="blog_title">
//       ${value.title}
//       </h3>
//       <p class="blog_title">
//       ${value.body}
//       </p>
//       <div class="comment_section">
//         <div class="comment_content">
//             <p>this is your comment</p>
//         </div>
//         <div class="comment_form">
//           <textarea class="comment" placeholder="add your comment">
//           </textarea>
//           <input type="submit" value="Add comment" />

//         </div>
//       </div>
//     </div>
//       `;
//       blog_item_content.append(blog_single);

//       //save my data into local storage
//       const dataSave = JSON.stringify(value);

//       // save to localStorage
//       localStorage.setItem("sngle_data", dataSave);
//     }
//   }
// });
