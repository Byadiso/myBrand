console.log("welcome to dashboard");
document.addEventListener("DOMContentLoaded", () => {
  const addBlogMenu = document.getElementById("add");
  const mainDashboard = document.getElementById("main_dashboard");
  const messageContainer = document.getElementById("message");
  const header_messages = document.getElementById("header_messages");
  const form = document.getElementById("form_blog");
  let token = JSON.parse(localStorage.getItem("token"));

  const name = document.querySelector('[name="name"]');
  const email = document.querySelector('[name="email"]');
  const message = document.querySelector('[name="message"]');
  const blogAdmin = document.getElementById("message");

  // addBlogMenu.addEventListener("click", () => {
  //   mainDashboard.classList.add("hide");
  //   form_blog.classList.remove("hide");
  // });

  const fetchMessage = () => {
    return fetch("http://localhost:3000/api/v1/messages")
      .then((resp) => resp.json())
      .then((messages) => {
        renderMessage(messages);
      });
  };

  const renderMessage = (data) => {
    console.log(data);
    data = data.messages;
    if (data == undefined) {
      const content_elt = document.createElement("DIV");
      header_messages.innerHTML = "";
      messageContainer.append(content_elt);
      return (content_elt.innerHTML = `<p>No Message Yet</p>`);
    }

    for (var i = 0; i < data.length; i++) {
      const { sender, email, content, _id, createdAt } = data[i];

      var timestamp = timeDifference(new Date(), new Date(createdAt));
      const content_elt = document.createElement("DIV");
      if (data.length === 0) {
        content_elt.innerHTML = `<h2> No Message yet</h2>`;
      }
      content_elt.innerHTML = `
          
            <h3 class="blog" data-id=${_id}>${sender + ", " + email}</h3>
     
            <p class="blog" data-id=${_id}>${content}</p>

            <h5 class="blog" data-id=${_id}>Sent,${timestamp}</h5>
            <hr>
            
            <div class="dashboard_bottom">
            <i class="fa fa-trash admin_control_button removeBlog" id="removeBlog" data-id=${_id}></i><p class="removeBlog" data-id=${_id}>Delete</p>
          
          </div>
          `;

      if (content_elt) {
        console.log("yeseee");
        const loading = document.getElementById("loading");
        loading.style.display = "none";
      }

      content_elt.setAttribute("class", "message_item");
      content_elt.setAttribute("data-id", _id);
      messageContainer.append(content_elt);
    }
  };

  fetchMessage();

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

  const deleteMessage = (id, token) => {
    return fetch(`http://localhost:3000/api/v1/message/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // window.location.href = "../html/dashboard.html";
        return response.json();
      })
      .catch((err) => console.log({ err, message: "soemthing went wrong" }));
  };

  blogAdmin.addEventListener("click", (e) => {
    if (e.target.className.includes("removeBlog")) {
      let id = e.target.dataset.id;
      console.log("yes delete " + id);
      let accept = alert("are you sure you want to delete this blog");

      deleteMessage(id, token);

      window.location.href = "../html/dashboard.html";
    }
  });
});
