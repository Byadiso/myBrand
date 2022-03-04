let data = { ...JSON.parse(localStorage.getItem("data")) };
// let blogId = JSON.parse(localStorage.getItem("id"));

let array = [];
let myId = location.href.split("?id=")[1];
let blogId = decodeURIComponent(myId);
// console.log(typeof blogId);
array = [...array, data];

const blog_item_content = document.querySelector("#blog_item_content");
let blog_single = document.createElement("DIV");

// let blog = array.find((item) => {
//   for (var [key, value] of Object.entries(item)) {
//     console.log(key);
//   }
// });

// console.log(blog);
// console.log(blog);
let blog = array.find((item) => {
  for (var [key, value] of Object.entries(item)) {
    // console.log("this is the" + value.uid_key);
    // console.log(typeof value.uid_key);
    console.log(value.uid_key.includes(blogId));
    if (value.uid_key.toString() === blogId) {
      blog_single.innerHTML = `
      <div class="blog_item_content" data-uid=${key}>

      <div class="single_blog_image">
        <img
          src=${value.Image}
          alt="photo_blog"
        />
      </div>
      <div class="icon_blog">
        <p><i class="fa fa-heart"></i>Like</p>
        <p><i class="fa fa-comment"></i>comment</p>

     </div>

      <h3 class="blog_title">
      ${value.title}
      </h3>
      <p class="blog_title">
      ${value.body}
      </p>
      <div class="comment_section">
        <div class="comment_content">
            <p>this is your comment</p>
        </div>
        <div class="comment_form">
          <textarea class="comment" placeholder="add your comment">
          </textarea>
          <input type="submit" value="Add comment" />

        </div>
      </div>
    </div>
      `;
      // to be added later

      // <i class="fa fa-trash admin_control_button" id="removeBlog" data-uid=${value.uid_key}></i><p>Delete</p>
      // <i class="fa fa-edit admin_control_button" id="editBlog" data-uid=${value.uid_key}></i><p>Edit</p>

      blog_item_content.append(blog_single);

      //save my data into local storage
      // const dataSave = JSON.stringify(value);

      // save to localStorage
      // localStorage.setItem("sngle_data", dataSave);
    }
  }
});
