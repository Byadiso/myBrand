let data = { ...JSON.parse(localStorage.getItem("data")) };
let blogId = JSON.parse(localStorage.getItem("id"));

let array = [];

array = [...array, data];

const blog_item_content = document.querySelector("#blog_item_content");
let blog_single = document.createElement("DIV");

let blog = array.find((item) => {
  for (var [key, value] of Object.entries(item)) {
    console.log("this is the " + value.id);
    if (parseInt(value.id) === parseInt(blogId)) {
      blog_single.innerHTML = `
      <div class="blog_item_content" data-uid=${key}>
      <h3>website Development</h3>
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
          <p>this is your comment</p>
        </div>
        <div class="comment_form">
          <textarea class="comment" placeholder="add your comment">
          </textarea>
          <input type="submit" value="add comment" />
          <div class="admin_control_button" data-uid=${key}>         
            <button id="removeBlog"> Remove</button>
            <button id="editBlog">Edit</button>

          </div>
        </div>
      </div>
    </div>
      `;
      blog_item_content.append(blog_single);
    }
  }
});
