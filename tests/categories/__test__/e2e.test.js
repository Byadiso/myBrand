// import request from "supertest";
// import app from "../../../";

// describe("user tests", () => {
//   let token;
//   beforeAll(() =>
//     request(app)
//       .post("/users")
//       .send({
//         name: "testo",
//         email: "testo@gmail.com",
//         password: "123123",
//         role: "user",
//       })
//       .then((res) => {
//         token = res.body.token;
//       })
//   );

//   describe("test signup", () => {
//     let user, res;
//     it("should signup unique user", async () => {
//       user = { name: "testo", email: "test1@gmail.com", password: "123123" };
//       res = await request(app).post("/users").send(user);
//       expect(res.body.message).toContain("successfully registered");
//     });
//     it("should not register an existing user", async () => {
//       user = { name: "testo", email: "testo@gmail.com", password: "123123" };
//       res = await request(app).post("/users").send(user);
//       expect(res.body.message).toContain("exists");
//     });
//     it("should not register if no email", async () => {
//       user = { name: "testo", email: "", password: "123123" };
//       res = await request(app).post("/users").send(user);
//       expect(res.body.error).toBe("email missing");
//     });
//     it("should not register if no name", async () => {
//       user = { name: "", email: "testo@mail.com", password: "123123" };
//       res = await request(app).post("/users").send(user);
//       expect(res.body.error).toBe("name missing");
//     });
//     it("should catch invalid email", async () => {
//       user = { name: "mkjhi", email: "testomail.com", password: "123123" };
//       res = await request(app).post("/users").send(user);
//       expect(res.body.error).toBe("invalid email");
//     });
//   });
//   describe("create blog", () => {
//     it("should not create blog", async () => {
//       const res = await request(app)
//         .post("/blogs")
//         .set("Authorization", "")
//         .send({ title: "kjhgfh", content: "hjghf" });
//       expect(res.body.message).toContain("login first");
//     });
//     it("should not creat blog if not admin", async () => {
//       const res = await request(app)
//         .post("/blogs")
//         .set("Authorization", "Bearer " + token)
//         .send({ title: "kjhgfh", content: "hjghf" });
//       expect(res.body.message).toContain("logged in as admin");
//     });
//   });
// });
