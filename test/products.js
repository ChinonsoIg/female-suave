//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Products = require('../models/Products');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

let expect = require('chai').expect;
let request = require('supertest');



chai.use(chaiHttp);
const userCredentials = {
  email: 'janedoe@yahoo.com',
  password: 'janedoe'
}
let token;

// //now let's login the user before we run any tests
// let authenticatedUser = request.agent(app);
// before(function(done) {
//   authenticatedUser
//     .post('/api/v1/auth/login')
//     .send(userCredentials)
//     .end(function(err, response) {
//       expect(response.statusCode).to.equal(200);
//       // expect('Location', '/');
//       done();
//     });
// });


//Our parent block
describe('Products', () => {
  
  // before(done => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/login')
  //     .send(userCredentials)
  //     .end((err, res) => {
  //       console.log('token: ', res.body.token)
  //       console.log('res: ', res.status)
  //       token = res.body.token;
  //       res.should.have.status(200);
  //       done();
  //     });
  // });
  beforeEach((done) => {
    //After each test, we empty the database
    Products.remove({}, (err) => {
      done();
    });
  });

  /* Test the /GET route */
  describe('/GET product', () => {
    it('it should GET all the products for storefront', (done) => {
      chai.request(app)
        .get('/api/v1/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property("products");
          done();
        });
    });
  });

  // describe('/POST product', () => {
  //   it('it should POST a product to the database', (done) => {
  //     let product = {
  //       name: "The Lord of the Rings",
  //       categoryId: "fekjj55kjjgk",
  //       quantity: 10,
  //       price: 1954,
  //       description: "fk description",
  //       status: "available",
  //       image: ["ww.nscdc"],
  //       createdBy: "8333333njnj"
  //     };

  //     chai
  //       .request(app)
  //       .post('/api/v1/products/admin')
  //       .set({ Authorization: `Bearer ${token}` })
  //       .send(product)
  //       .end((err, res) => {
  //       console.log('res body: ', res.body)
  //         res.should.have.status(201);
  //         res.body.should.be.a('object');
  //         // res.body.should.have.property('errors');
  //         // res.body.errors.should.have.property('price');
  //         // res.body.errors.pages.should.have.property('kind').eql('required');
  //         done();
  //       });
  //   });
  // });

});