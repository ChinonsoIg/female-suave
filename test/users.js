//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const User = require('../models/User');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const { expect } = chai;




chai.use(chaiHttp);



// Merchant block
describe('Test for get user by the user', () => {
  let token = null;
  let userId = null;

  before(done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'janedoe@yahoo.com',
        password: 'janedoe'
      })
      .end((err, res) => {
        token = res.body.token;
        userId = res.body.user.userId;
        res.should.have.status(200);
        done();
      })
  });

  // beforeEach((done) => {
  //   // Before each test, we empty the database
  //   User.remove({}, (err) => {
  //     done();
  //   })
  // });

  // Test the /GET/:id route
  it('it should GET a user by the user', (done) => {

    chai
      .request(app)
      .get(`/api/v1/users/merchant/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .set({ "Accept": "application/json" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.user.should.have.property('_id');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('address');
        res.body.user.should.have.property('firstName');
        res.body.user.should.have.property('lastName');
        res.body.user.should.have.property('phoneNumber');
        done();
      });

  });

  // Test the /PATCH/:id route
  it('it should UPDATE a user by the user', (done) => {

    chai
      .request(app)
      .patch(`/api/v1/users/merchant/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .set({ "Accept": "application/json" })
      .send({
        firstName: "Mac Test update",
        lastName: "Doe Test update",
        address: "17 Lagos street Lagos",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.user.should.have.property('_id');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('address');
        res.body.user.should.have.property('firstName');
        res.body.user.should.have.property('lastName');
        res.body.user.should.have.property('phoneNumber');
        done();
      });


  });

  // Test the /DELETE/:id route
  it('it should DELETE a user by the user', (done) => {

    chai
      .request(app)
      .delete(`/api/v1/users/merchant/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .set({ "Accept": "application/json" })
      .end((err, res) => {
        console.log("obj dele: ", res.body)
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.user.should.have.property('_id');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('address');
        res.body.user.should.have.property('firstName');
        res.body.user.should.have.property('lastName');
        res.body.user.should.have.property('phoneNumber');
        res.body.should.have.property('message').eql('Deleted successfully');
        done();
      });

  });


});



// Admin products block
describe('Test for users on the Admin dashboard', () => {
  let token = null;

  before(done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'johndoe@yahoo.com',
        password: 'johndoe'
      })
      .end((err, res) => {
        token = res.body.token;
        expect(res.statusCode).to.equal(200);
        done();
      })
  });

  // beforeEach((done) => {
  //   // Before each test, we empty the database
  //   User.remove({}, (err) => {
  //     done();
  //   })
  // });

  // Test the /GET route
  it('it should GET all the users for the Admin', (done) => {
    chai.request(app)
      .get('/api/v1/users/admin')
      .set("Authorization", `Bearer ${token}`)
      .set({ "Accept": "application/json" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        should.exist(res.body);
        res.body.should.be.a('object');
        done();
      })
  })

  // Test the /GET/:id route
  it('it should GET a user by the Admin', (done) => {
    
    chai
      .request(app)
      .get(`/api/v1/users/admin/63ec5612285beab9b2426abe`)
      .set("Authorization", `Bearer ${token}`)
      .set({ "Accept": "application/json" })
      .end((err, res) => {
        should.exist(res.body);
        res.body.should.be.a('object');
        res.should.have.status(200);
        done();
      });

  });

  // Test the /PATCH/:id route
  it('it should UPDATE a user by the Admin', (done) => {

    chai
      .request(app)
      .patch(`/api/v1/users/admin/63ec5612285beab9b2426abe`)
      .set("Authorization", `Bearer ${token}`)
      .set({ "Accept": "application/json" })
      .send({ status: "active" })
      .end((err, res) => {
        should.exist(res.body);
        res.body.should.be.a('object');
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Update successful');

        done();
      });

  });


});

