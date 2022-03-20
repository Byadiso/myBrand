import request from "supertest";
import app from "../../../";

describe("Blogs tests", () => {
  //let retrie token
  let token;
  let blogId;
  //   beforeAll(() =>
  //     request(app)
  //       .post("/login")
  //       .send({
  //         email: "testo@gmail.com",
  //         password: "123123",
  //       })
  //       .then((res) => {
  //         token = res.body.token;
  //       })
  //   );

  describe("Test Blog Create", () => {
    let blog, res;

    it("should create a blog ", async (done) => {
      jest.setTimeout(30000);
      blog = {
        title: "Yes it is awesome",
        content: "yeseeee  it is  and todayis a new day",
        image: "testo12",
      };
      //   let user = {
      //     email: "testo@gmail.com",
      //     password: "123123",
      //   };

      //   let loggedUser = await request(app).post("/login").send(user);

      res = await request(app)
        .post("/blog/create")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI0MGMzNDEyOWRkYzgyYThkYWI0OWEiLCJpYXQiOjE2NDY1Mjk1OTl9.jd2QL8mZRz3qsnFC0dORsGBnkNKkvPiSxchZe_vN3Go"
        )
        .send(blog);
      expect(res.body.message).toContain(
        "Your blog has been created successfuly"
      );
      console.lg(res.body);
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
  //   });
});
