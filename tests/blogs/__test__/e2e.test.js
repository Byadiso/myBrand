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

    it("should create a blog ", async (done) => {
      blog = {
        title: "Yes it is awesome",
        content: "yeseeee  it is  and todayis a new day",
        // image: "testo12",
      };
      //   let user = {
      //     email: "testo@gmail.com",
      //     password: "123123",
      //   };

      //   let loggedUser = await request(app).post("/login").send(user);

      await request(app)
        .post("/blog/create")
        .send(blog)
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI0MGMzNDEyOWRkYzgyYThkYWI0OWEiLCJpYXQiOjE2NDcyMjE4MDN9.1UqN9J8qhGJ3_KQGg9wL1J0QZXEd2klcGFFwQG3XMEo"
        )
        .then((data) => {
          console.log(data);
        });
      //   expect(data.body.message).toContain(
      //     "Your blog has been created successfuly"
      //   );
      done();
    });
  });

  // it("should not create a blog without a title", async () => {
  //   blog = {
  //     title: "",
  //     content: "yeseeee  it is  and todayis a new day",
  //     image: "testo12",
  //   };

  //   let loggedUser = await request(app).post("/login").send({
  //     email: "testo@gmail.com",
  //     password: "123123",
  //   });

  //   res = await request(app)
  //     .post("/blog/create")
  //     .set("Authorization", "Bearer " + loggedUser.body.token)
  //     .send(blog);
  //   expect(res.body.error).toContain("Title is required");
  // });

  // it("should not create a blog without a content", async () => {
  //   blog = {
  //     title: "yess",
  //     content: "",
  //     image: "testo12",
  //   };

  //   let loggedUser = await request(app).post("/login").send({
  //     email: "testo@gmail.com",
  //     password: "123123",
  //   });

  //   res = await request(app)
  //     .post("/blog/create")
  //     .set("Authorization", "Bearer " + loggedUser.body.token)
  //     .send(blog);
  //   expect(res.body.error).toContain("Content is required");
  // });

  // it("Admin only should create a blog", async () => {
  //   blog = {
  //     title: "yess",
  //     content: "",
  //     image: "testo12",
  //   };

  //   let loggedUser = await request(app).post("/login").send({
  //     email: "testo@gmail.com",
  //     password: "123123",
  //   });

  //   res = await request(app)
  //     .post("/blog/create")
  //     .set("Authorization", "Bearer    " + loggedUser.body.token)
  //     .send(blog);
  //   expect(res.body.error).toContain("Access denied");
  // });

  // it("Blog title should be min 4 character", async () => {
  //   blog = {
  //     title: "ys",
  //     content: "dafdsafd",
  //     image: "testo12",
  //   };

  //   let loggedUser = await request(app).post("/login").send({
  //     email: "testo@gmail.com",
  //     password: "123123",
  //   });

  //   res = await request(app)
  //     .post("/blog/create")
  //     .send(blog)
  //     .set("Authorization", "Bearer " + loggedUser.body.token);
  //   expect(res.body.message).toBe("Title should be min 4 character");
  // });

  // it("Blog title should be mmax 32 character", async () => {
  //   blog = {
  //     title: "y132132143241432432414321432414s",
  //     content: "adafdfs",
  //     image: "testo12",
  //   };

  //   let loggedUser = await request(app).post("/login").send({
  //     email: "testo@gmail.com",
  //     password: "123123",
  //   });

  //   res = await request(app)
  //     .post("/blog/create")
  //     .set("Authorization", "Bearer " + loggedUser.body.token)
  //     .send(blog);
  //   expect(res.body.message).toBe("Title should be max 32 character");
  // });
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
