import request from "supertest";
import app from "../../../";

import mongoose from "mongoose";
import { MongoClient } from "mongodb";

beforeEach(async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected"))
    .catch((error) => {
      console.log(error);
    });
}, 9000);

describe("Blogs tests", () => {
  //let retrie token
  let token;
  let blogId;

  let connection;
  let db;

  //   beforeAll(async () => {
  //     connection = await MongoClient.connect(global.__MONGO_URI__, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     });
  //     db = await connection.db(global.__MONGO_DB_NAME__);
  //   });

  //   afterAll(async () => {
  //     await connection.close();
  //   });

  describe("Test Blog Create", () => {
    let blog, res;

    it("should create a blog ", async () => {
      blog = {
        title: "Yes it is awesome",
        content: "yeseeee  it is  and todayis a new day",
        image: "Yes this is the image",
      };

      const formData = new FormData();

      formData.append("title", blog.title);
      formData.append("image", blog.iamge);
      formData.append("content", blog.content);

      let loggedUser = await request(app).post("/api/v1/login").send({
        email: "testo@gmail.com",
        password: "123123",
      });

      let res = await request(app)
        .post("/api/v1/blog/create")
        .send(formData)
        .set("Authorization", "Bearer " + loggedUser.body.token);

      expect(res.body.message).toContain(
        "Your blog is created successful by req.body instead of a form with an image"
      );
    });

    //   it("should not create a blog if no token provided", async () => {
    //     blog = {
    //       title: "Yes it is awesome",
    //       content: "yeseeee  it is  and todayis a new day",
    //       image: "testo12",
    //     };

    //     let res = await request(app)
    //       .post("/api/v1/blog/create")
    //       .send(blog)
    //       .set("Authorization", "");

    //     expect(res.body.message).toContain(
    //       "A token is required for authentication"
    //     );
    //   });

    //   it("should not create a blog without a title", async () => {
    //     blog = {
    //       title: "",
    //       content: "yeseeee  it is  and todayis a new day",
    //       image: "testo12",
    //     };

    //     let loggedUser = await request(app).post("/api/v1/login").send({
    //       email: "testo@gmail.com",
    //       password: "123123",
    //     });

    //     res = await request(app)
    //       .post("/api/v1/blog/create")
    //       .set("Authorization", "Bearer " + loggedUser.body.token)
    //       .send(blog);
    //     expect(res.body.error).toContain("Title is required");
    //   });

    //   it("should not create a blog without a content", async () => {
    //     blog = {
    //       title: "yess",
    //       content: "",
    //       image: "testo12",
    //     };

    //     let loggedUser = await request(app).post("/api/v1/login").send({
    //       email: "testo@gmail.com",
    //       password: "123123",
    //     });

    //     res = await request(app)
    //       .post("/api/v1/blog/create")
    //       .set("Authorization", "Bearer " + loggedUser.body.token)
    //       .send(blog);
    //     expect(res.body.error).toContain(
    //       "Blog validation failed: content: Path `content` is required."
    //     );
    //   });

    //   it("Admin only should create a blog", async () => {
    //     blog = {
    //       title: "yess",
    //       content: "yesssssss",
    //       image: "testo12",
    //     };

    //     //using not admin user's details
    //     let loggedUser = await request(app).post("/api/v1/login").send({
    //       email: "test@gmail.com",
    //       password: "123123",
    //     });

    //     res = await request(app)
    //       .post("/blog/create")
    //       .set("Authorization", "Bearer " + loggedUser.body.token)
    //       .send(blog);
    //     expect(res.body.error).toContain("Access denied");
    //   });

    //   it("Blog title should be min 4 character", async () => {
    //     blog = {
    //       title: "ys",
    //       content: "dafdsafd",
    //       image: "testo12",
    //     };

    //     let loggedUser = await request(app).post("/api/v1/login").send({
    //       email: "testo@gmail.com",
    //       password: "123123",
    //     });

    //     res = await request(app)
    //       .post("/blog/create")
    //       .send(blog)
    //       .set("Authorization", "Bearer " + loggedUser.body.token);
    //     expect(res.body.error).toBe(
    //       "Blog validation failed: title: title should be at least four characters"
    //     );
    //   });

    //   it("Blog title should be mmax 32 character", async () => {
    //     blog = {
    //       title: "y13213214324143243241432143fhjgjhgjhkgjgjgkjhgkjgh2414s",
    //       content: "adafdfs",
    //       image: "testo12",
    //     };

    //     let loggedUser = await request(app).post("/api/v1/login").send({
    //       email: "testo@gmail.com",
    //       password: "123123",
    //     });

    //     res = await request(app)
    //       .post("/api/v1/blog/create")
    //       .set("Authorization", "Bearer " + loggedUser.body.token)
    //       .send(blog);
    //     expect(res.body.error).toBe(
    //       "Blog validation failed: title: title should less than 32 characters"
    //     );
    //   });
  });
});

//   describe("Test Update Blog ", () => {
//     let blog;

//     it("should update blog successfully", async () => {
//       blog = {
//         title: "y132132143241432432414321432414s",
//         content: "adafdfs",
//         image: "testo12",
//       };

//       let loggedUser = await request(app).post("/login").send({
//         email: "testo@gmail.com",
//         password: "123123",
//       });
//       const res = await request(app)
//         .put(`/blogs/${blogId}`)
//         .set("Authorization", "Bearer " + loggedUser.body.token)
//         .send(blog);
//       expect(res.body.message).toContain("Blog updated successfully");
//     });
//   });

//   describe("Test Get All Blogs ", () => {
//     it("should get all blogs", async () => {
//       const res = await request(app).get("/blogs");
//       expect(res.body.message).toContain("all Blogs");
//     });
//   });

//   describe("Test Get Single Blog ", () => {
//     it("should get single blog", async () => {
//       let blog = {
//         title: "y132132143241432432414321432414s",
//         content: "adafdfs",
//         image: "testo12",
//       };

//       let user = {
//         email: "testo@gmail.com",
//         password: "12313",
//       };

//       let loggedUser = await request(app).post("/login").send(user);

//       let createdBlog = await request(app)
//         .post("/create/blog")
//         .set("Authorization", "Bearer " + loggedUser.body.token)
//         .send(blog);

//       const res = await request(app).get(`/blogs/${createdBlog.body._id}`);
//       expect(res.body.message).toContain("Single blog");
//     });
//   });

//   describe("Test Delete Single Blog ", () => {
//     it("should get single blog", async () => {
//       let blog = {
//         name: "testosgfsgf",
//         content: "13241",
//         image: "imm",
//       };

//       let loggedUser = await request(app).post("/login").send({
//         email: "testo@gmail.com",
//         password: "123123",
//       });

//       let createdBlog = await request(app)
//         .post("/blog/create")
//         .send(blog)
//         .set("Authorization", "Bearer " + loggedUser.body.token);

//       console.log(createdBlog.body);

//       const res = await request(app)
//         .delete(`/blogs/${createdBlog.body.blog._id}`)
//         .set("Authorization", "Bearer " + loggedUser.body.token);
//       expect(res.body.message).toContain("blog deleted successfully");
//     }, 30000);
//   //   });
// });
