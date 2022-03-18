/* eslint-disable no-undef */
import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

// let server = 'http://localhost:3000'

chai.should();
chai.use(chaiHttp);

describe("TEST POST Blog /blog/create", () => {
  it("Blog should be created", (done) => {
    const data = {
      title: "this is a new day",
      content: "yes it is a new day ",
      image: "fadafdfadfafdafa",
    };

    chai
      .request(app)
      .post("/blogs/create")
      .send(data)
      .then((err, res) => {
        if (err) res.should.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      })
      .catch(done());
  });

  it("Blog shouldn't be empty title or content", function (done) {
    const data = {
      title: "",
      content: "",
      image: "fadafdfadfafdafa",
    };

    chai
      .request(app)
      .post("/blogs/create")
      .send(data)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(403);
        done();
      });
  });
});

describe("TEST Get All Blogs /blogs", () => {
  it(" User should get all blogs", (done) => {
    chai
      .request(app)
      .get(`/blogs/`)
      .then((err, res) => {
        if (err);
        res.should.have.status(200);
        expect(res.body).to.be.a("object");
      })
      .catch(done());
  });
});

describe("TEST GET Blog /blogs/:blogId/", () => {
  it(" Should be able to view single blog", (done) => {
    const id = {
      id: "id",
    };

    chai
      .request(app)
      .get(`/blogs/${id}`)
      .then((err, res) => {
        if (err);
        res.should.have.status(201);
        expect(res.body).to.be.a("object");
      })
      .catch(done());
  });
});

describe("TEST Update Blog /blogs/:blogId/", () => {
  it(" User should be sign user out", (done) => {
    const data = {
      title: "this is a new day",
      content: "yes it is a new day ",
      image: "fadafdfadfafdafa",
    };

    const id = {
      id: "id",
    };
    chai
      .request(app)
      .put(`/blogs/${id}/`)
      .send(data)
      .then((err, res) => {
        if (err);
        res.should.have.status(200);
      })
      .catch(done());
  });
});

describe("TEST Delete  Blog /blogs/:blogId/", () => {
  it(" User should be sign user out", (done) => {
    const id = {
      id: "id",
    };
    chai
      .request(app)
      .put(`/blogs/${id}/`)
      .then((err, res) => {
        if (err);
        res.should.have.status(200);
      })
      .catch(done());
  });
});
