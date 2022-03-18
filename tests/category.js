/* eslint-disable no-undef */
import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

// let server = 'http://localhost:3000'

chai.should();
chai.use(chaiHttp);

describe("TEST POST category /category/create", () => {
  it("category should be created", (done) => {
    const data = {
      name: "sport",
    };

    chai
      .request(app)
      .post("/category/create")
      .send(data)
      .then((err, res) => {
        if (err) res.should.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      })
      .catch(done());
  });

  it("category shouldn't have to be empty name of category", function (done) {
    const data = {
      name: "",
    };

    chai
      .request(app)
      .post("/category/create")
      .send(data)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(401);
        done();
      });
  });
});

describe("TEST Get All categorys /categories", () => {
  it(" User should get all categorys", (done) => {
    chai
      .request(app)
      .get(`/categories/`)
      .then((err, res) => {
        if (err);
        res.should.have.status(200);
        expect(res.body).to.be.a("object");
      })
      .catch(done());
  });
});

describe("TEST GET Specific category /categories/:categoryId/", () => {
  it(" Should be able to view single category", (done) => {
    const id = {
      id: "id",
    };

    chai
      .request(app)
      .get(`/categories/${id}`)
      .then((err, res) => {
        if (err);
        res.should.have.status(200);
        expect(res.body).to.be.a("object");
      })
      .catch(done());
  });
});

describe("TEST Update category /category/:categoryId/", () => {
  it(" User should be sign user out", (done) => {
    const data = {
      name: "Entertainment",
    };

    const id = {
      id: "id",
    };
    chai
      .request(app)
      .put(`/category/${id}/`)
      .send(data)
      .then((err, res) => {
        if (err);
        res.should.have.status(200);
      })
      .catch(done());
  });
});

describe("TEST Delete  category /category/:categoryId/", () => {
  it(" User should be sign user out", (done) => {
    const id = {
      id: "id",
    };
    chai
      .request(app)
      .put(`/category/${id}/`)
      .then((err, res) => {
        if (err);
        res.should.have.status(200);
      })
      .catch(done());
  });
});
