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

describe("messages tests", () => {
  //let retrie token
  let token;
  let messageId;

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

  describe("Test message Create", () => {
    let message, res;

    it("should create a message ", async () => {
      message = {
        sender: "desire",
        content: "yeseeee  it is  and todayis a new day",
        email: "testo@gmail.com",
      };

      let res = await request(app)
        .post("/message/create")
        .send(message)
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI0MGMzNDEyOWRkYzgyYThkYWI0OWEiLCJpYXQiOjE2NDcyMjE4MDN9.1UqN9J8qhGJ3_KQGg9wL1J0QZXEd2klcGFFwQG3XMEo"
        );

      expect(res.body.message).toContain(
        "Your message is created successful by req.body instead of a form with an image"
      );
    });

    it("should not create a message if no token provided", async () => {
      message = {
        sender: "desire",
        content: "yeseeee  it is  and todayis a new day",
        email: "testo@gmail.com",
      };

      let res = await request(app).post("/message/create").send(message);
      expect(res.body.message).toContain(
        "A token is required for authentication"
      );
    });

    it("should not create a message without a title", async () => {
      message = {
        sender: "desire",
        content: "yeseeee  it is  and todayis a new day",
        email: "testo@gmail.com",
      };

      let loggedUser = await request(app).post("/login").send({
        email: "testo@gmail.com",
        password: "123123",
      });

      res = await request(app)
        .post("/message/create")
        .set("Authorization", "Bearer " + loggedUser.body.token)
        .send(message);
      expect(res.body.error).toContain("Title is required");
    });

    it("should not create a message without a content", async () => {
      message = {
        sender: "desire",
        content: "yeseeee  it is  and todayis a new day",
        email: "testo@gmail.com",
      };

      let loggedUser = await request(app).post("/login").send({
        email: "testo@gmail.com",
        password: "123123",
      });

      res = await request(app)
        .post("/message/create")
        .set("Authorization", "Bearer " + loggedUser.body.token)
        .send(message);
      expect(res.body.error).toContain(
        "message validation failed: content: Path `content` is required."
      );
    });

    it("Admin only should create a message", async () => {
      message = {
        sender: "desire",
        content: "yeseeee  it is  and todayis a new day",
        email: "testo@gmail.com",
      };

      //using not admin user's details
      let loggedUser = await request(app).post("/login").send({
        email: "test@gmail.com",
        password: "123123",
      });

      res = await request(app)
        .post("/message/create")
        .set("Authorization", "Bearer " + loggedUser.body.token)
        .send(message);
      expect(res.body.error).toContain("Access denied");
    });

    it("message title should be min 4 character", async () => {
      message = {
        sender: "desire",
        content: "yeseeee  it is  and todayis a new day",
        email: "testo@gmail.com",
      };

      let loggedUser = await request(app).post("/login").send({
        email: "testo@gmail.com",
        password: "123123",
      });

      res = await request(app)
        .post("/message/create")
        .send(message)
        .set("Authorization", "Bearer " + loggedUser.body.token);
      expect(res.body.error).toBe(
        "message validation failed: title: title should be at least four characters"
      );
    });

    it("message title should be mmax 32 character", async () => {
      message = {
        sender: "desire",
        content: "yeseeee  it is  and todayis a new day",
        email: "testo@gmail.com",
      };

      let loggedUser = await request(app).post("/login").send({
        email: "testo@gmail.com",
        password: "123123",
      });

      res = await request(app)
        .post("/message/create")
        .set("Authorization", "Bearer " + loggedUser.body.token)
        .send(message);
      expect(res.body.error).toBe(
        "message validation failed: title: title should less than 32 characters"
      );
    });
  });
});

//   describe("Test Update message ", () => {
//     let message;

//     it("should update message successfully", async () => {
//       message = {
//         title: "y132132143241432432414321432414s",
//         content: "adafdfs",
//         image: "testo12",
//       };

//       let loggedUser = await request(app).post("/login").send({
//         email: "testo@gmail.com",
//         password: "123123",
//       });
//       const res = await request(app)
//         .put(`/messages/${messageId}`)
//         .set("Authorization", "Bearer " + loggedUser.body.token)
//         .send(message);
//       expect(res.body.message).toContain("message updated successfully");
//     });
//   });

//   describe("Test Get All messages ", () => {
//     it("should get all messages", async () => {
//       const res = await request(app).get("/messages");
//       expect(res.body.message).toContain("all messages");
//     });
//   });

//   describe("Test Get Single message ", () => {
//     it("should get single message", async () => {
//       let message = {
//         title: "y132132143241432432414321432414s",
//         content: "adafdfs",
//         image: "testo12",
//       };

//       let user = {
//         email: "testo@gmail.com",
//         password: "12313",
//       };

//       let loggedUser = await request(app).post("/login").send(user);

//       let createdmessage = await request(app)
//         .post("/create/message")
//         .set("Authorization", "Bearer " + loggedUser.body.token)
//         .send(message);

//       const res = await request(app).get(`/messages/${createdmessage.body._id}`);
//       expect(res.body.message).toContain("Single message");
//     });
//   });

//   describe("Test Delete Single message ", () => {
//     it("should get single message", async () => {
//       let message = {
//         name: "testosgfsgf",
//         content: "13241",
//         image: "imm",
//       };

//       let loggedUser = await request(app).post("/login").send({
//         email: "testo@gmail.com",
//         password: "123123",
//       });

//       let createdmessage = await request(app)
//         .post("/message/create")
//         .send(message)
//         .set("Authorization", "Bearer " + loggedUser.body.token);

//       console.log(createdmessage.body);

//       const res = await request(app)
//         .delete(`/messages/${createdmessage.body.message._id}`)
//         .set("Authorization", "Bearer " + loggedUser.body.token);
//       expect(res.body.message).toContain("message deleted successfully");
//     }, 30000);
//   //   });
// });
