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

//   describe("Get all users", () => {
//     it("should get all users", async () => {
//       const res = await request(app).get("/users");
//       expect(res.body.message).toContain("all users");
//     });

//     it("should Update user's details", async () => {
//       const res = await request(app)
//         .post("/users/:userId")
//         .set("Authorization", "Bearer " + token)
//         .send({ name: "kjhgfh", username: "hjghf" });
//       expect(res.body.message).toContain("user updated successfully");
//     });
//   });
// });
