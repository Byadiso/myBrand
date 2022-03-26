import request from "supertest";
import app from "../../";

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

describe("messages tests", () => {
  describe("Test message Create", () => {
    let message, res;

    it("should create a message ", async () => {
      message = {
        sender: "desire",
        content: "yeseeee  it is  and todayis a new day",
        email: "testo@gmail.com",
      };

      let res = await request(app).post("/api/v1/message/create").send(message);

      expect(res.body.message).toContain("Your message is created successful");
    });

    it("should not create a message if no sender provided", async () => {
      message = {
        sender: "",
        content: "yeseeee  it is  and todayis a new day",
        email: "testo@gmail.com",
      };

      let res = await request(app).post("/api/v1/message/create").send(message);
      expect(res.body.error).toContain("Your name is required.");
    });

    it("should not create a message without a email", async () => {
      message = {
        sender: "desire",
        content: "yeseeee  it is  and today is a new day",
        email: "",
      };

      res = await request(app)
        .post("/api/v1/message/create")

        .send(message);
      expect(res.body.error).toContain("Your email is required.");
    });

    it("should not create a message without a content", async () => {
      message = {
        sender: "desire",
        content: "",
        email: "testo@gmail.com",
      };

      res = await request(app).post("/api/v1/message/create").send(message);
      expect(res.body.error).toContain("Your content is required.");
    });

    it("should get all messages", async () => {
      const res = await request(app).get("/api/v1/messages");
      expect(res.body.message).toContain("all messages");
    });

    it("should not get all messages if routes is wrong", async () => {
      const res = await request(app).get("/api/v1/messagesss");
      expect(res.body.error).toContain("Sorry this router doesn't exist !");
    });

    it("should get single message", async () => {
      let user = {
        email: "testo@gmail.com",
        password: "12313",
      };

      const messageId = await request(app).get("/api/v1/messages").messages[0]
        ._id;

      let loggedUser = await request(app).get("/login").send(user);

      let singleMessage = await request(app)
        .get(`/api/v1/message/${messageId}`)
        .set("Authorization", "Bearer " + loggedUser.body.token);

      expect(singleMessage.body.message).toContain("Single message");
    });

    it("should Delete a message", async () => {
      const messageId = await request(app).get("/api/v1/messages").messages[0]
        ._id;
      let loggedUser = await request(app).post("/api/v1/login").send({
        email: "testo@gmail.com",
        password: "123123",
      });

      const message = await request(app)
        .delete(`/api/v1/messages/${messageId}`)
        .set("Authorization", "Bearer " + loggedUser.body.token);
      expect(message.body.message).toContain("message deleted successfully");
    });
  });
});
