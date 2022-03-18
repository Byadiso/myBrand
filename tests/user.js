// /* eslint-disable no-undef */
// import chai from "chai";
// import { expect } from "chai";
// import chaiHttp from "chai-http";
// import app from "../server.js";

// // let server = 'http://localhost:3000'

// chai.should();
// chai.use(chaiHttp);

// describe("TEST POST User /login", () => {
//   it(" User should be logged in", (done) => {
//     const details = {
//       email: "nganatech@gmail.com",
//       password: "111111111",
//     };

//     chai
//       .request(app)
//       .post("/login")
//       .send(details)
//       .end((err, res) => {
//         if (err) done(err);
//         res.should.have.status(200);
//         expect(res.body).to.be.a("object");
//         done();
//       });
//   });

//   it("it should not login user, should show not found api ", function (done) {
//     const details = {
//       email: "rubavu@gmail.com",
//       password: "desire",
//     };

//     chai
//       .request(app)
//       .post("/loginn")
//       .send(details)
//       .end((err, res) => {
//         if (err) done(err);
//         res.should.have.status(404);
//         done();
//       });
//   });
// });
