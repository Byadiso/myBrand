let data = { ...JSON.parse(localStorage.getItem("data")) };
let blogId = JSON.parse(localStorage.getItem("id"));

let array = [];

array = [...array, data];

let blog = array.find((item) => {
  for (var [key, value] of Object.entries(item)) {
    console.log("this is the " + value.id);
    if (parseInt(value.id) === parseInt(blogId)) {
      return console.log(value);
    }
  }
});
// console.log(blog);
