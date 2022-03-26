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

describe("CATEGORIES tests", () => {
  let token;

  describe("Create a category Test", () => {
    let category, res;
    it("should create a category", async () => {
      category = {
        name: "sport",
      };

      let loggedUser = await request(app).post("/api/v1/login").send({
        email: "test1@gmail.com",
        password: "123123",
      });

      res = await request(app)
        .post("/api/v1/category/create")
        .send(category)
        .set("Authorization", "Bearer " + loggedUser.body.token);
      expect(res.body.message).toContain("successfully created a category");
    });

    it("should not create a category with no name", async () => {
      category = {
        name: "",
      };

      let cat = await request(app)
        .post("/api/v1/category/create")
        .send(category);

      expect(cat.body.error).toContain("Your category name is required");
    });

    it("should get all categories", async () => {
      res = await request(app).get("/api/v1/categories");
      expect(res.body.message).toContain("all your categories");
    });

    it("should get single category", async () => {
      let cat = await request(app).get("/api/v1/categories/");
      // .then((item) => console.log(item._body.categories[0]._id));

      res = await request(app).get(
        `/api/v1/categories/${cat._body.categories[0]._id}`
      );
      expect(res.body.message).toContain("Single category");
    });

    it("should not get single category if no id provided", async () => {
      let categoryId = await request(app).get("/api/v1/categories").Categories;
      let category = await request(app).get(`/api/v1/categories/${categoryId}`);
      expect(category.body.error).toContain("category Does not exist");
    });

    it("should update a category", async () => {
      let loggedUser = await request(app).post("/api/v1/login").send({
        email: "test1@gmail.com",
        password: "123123",
      });

      let categoryId = await request(app).get("/api/v1/categories");
      let category = await request(app)
        .put(`/api/v1/category/${categoryId._body.categories[0]._id}`)
        .send({ name: "sport" })
        .set("Authorization", "Bearer " + loggedUser.body.token);
      expect(category.body.message).toContain("Category updated successfully");
    });

    it("should not update a category if no id provided", async () => {
      let categoryId = await request(app).get("/api/v1/categories");

      let category = await request(app).put(`/api/v1/category/${categoryId}`);
      expect(category.body.error).toContain("category Does not exist");
    });

    it("should delete a category", async () => {
      let categoryId = await request(app).get("/api/v1/categories");
      let category = await request(app).delete(
        `/api/v1/category/${categoryId._body.categories[0]._id}`
      );
      expect(category.body.message).toContain("Category deleted successfully");
    });

    it("should not delete a category if no id provided", async () => {
      let categoryId = await request(app).get("/api/v1/categories");

      let category = await request(app).delete(
        `/api/v1/category/${categoryId}`
      );
      expect(category.body.error).toContain("category Does not exist");
    });
  });
});
