import request from "supertest";
import app from "../../../";
import mongoose from "mongoose";

beforeEach(async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected"))
    .catch((error) => {
      console.log(error);
    });
}, 9000);

describe("USER tests", () => {
  let token;

  describe("Get all users", () => {
    it("should get all users", async () => {
      const res = await request(app).get("/api/v1/users");
      expect(res.body.message).toContain("all users");
    });

    it("should Update user's details", async () => {
      let loggedUser = await request(app).post("/api/v1/login").send({
        email: "testo@gmail.com",
        password: "123123",
      });

      const res = await request(app)
        .post("/api/v1/users/:userId")
        .send({ name: "updated user", username: "yes" })
        .set("Authorization", "Bearer " + loggedUser.body.token);
      expect(res.body.message).toContain("user updated successfully");
    });
  });
});
