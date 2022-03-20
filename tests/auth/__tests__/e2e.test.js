// import request from "supertest";
// import app from "../../../";

// describe("Auth tests", () => {
//   describe("TEST  AUTH signup", () => {
//     let user, res;

//     it("should register user ", async () => {
//       user = {
//         name: "desire byamungu",
//         email: "test12@gmail.com",
//         username: "testo12",
//         password: "123123",
//       };
//       res = await request(app).post("/signup").send(user);
//       expect(res.body.message).toContain("account registered Successfully");
//     });

//     it("should not register an existing email", async () => {
//       user = {
//         name: "desire byamungu",
//         email: "test@gmail.com",
//         username: "testo1",
//         password: "pass123",
//       };
//       res = await request(app).post("/signup").send(user);
//       expect(res.body.message).toContain("email in user");
//     });

//     it("should not register an existing username", async () => {
//       user = {
//         name: "desire byamungu",
//         email: "test@gmail.com",
//         username: "testo",
//         password: "pass123",
//       };
//       res = await request(app).post("/signup").send(user);
//       expect(res.body.message).toContain("username  already in user");
//     });

//     it("should not register if no email", async () => {
//       user = { name: "desire byamungu", email: "", password: "pass123" };
//       res = await request(app).post("/signup").send(user);
//       expect(res.body.error).toBe("Email must contain @");
//     });

//     it("should not register if no name", async () => {
//       user = { name: "", email: "test@mail.com", password: "pass123" };
//       res = await request(app).post("/signup").send(user);
//       expect(res.body.error).toBe("Name is required");
//     });

//     it("should not register user with invalid email", async () => {
//       user = { name: "test", email: "testmail.com", password: "123123" };
//       res = await request(app).post("/signup").send(user);
//       expect(res.body.error).toBe("Email must contain @");
//     });
//   });

//   describe("Login user", () => {
//     it("should login user successfully", async () => {
//       const res = await request(app)
//         .post("/login")
//         .send({ email: "test@gmail.com", password: "123123" });
//       expect(res.body.message).toContain("user logged in successfully");
//     });

//     "should not log user with no email",
//       async () => {
//         const res = await request(app)
//           .post("/login")
//           .send({ email: "", password: "123123" });
//         expect(res.body.error).toContain("email is required");
//       };
//   });
// });
