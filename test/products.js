// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// const mongoose = require("mongoose");
// const Products = require('../models/Products');

// //Require the dev-dependencies
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app');
// const should = chai.should();
// const { expect } = chai;




// chai.use(chaiHttp);


// // Storefront block
// describe('Test for products in storefront', () => {

//   beforeEach((done) => {
//     //Before each test, we empty the database
//     Products.remove({}, (err) => {
//       done();
//     });
//   });

//   // Test the /GET route
//   it('it should GET all the products for storefront', (done) => {
//     chai.request(app)
//       .get('/api/v1/products/storefront')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property("products");
//         done();
//       });
//   });

//   // Test the /GET/:id route
//   it('it should GET a product by the given id for storefront', (done) => {
//     let newProduct = new Products({
//       image: ["https://picsum.photos/id/329/200/200"],
//       status: "available",
//       name: "trainers",
//       categoryId: "63c6b11010a9629498d84656",
//       price: "25000",
//       quantity: "18",
//       description: "unisex trainers",
//       createdBy: "61e175f5b3fec1a25db028ff"
//     });

//     newProduct.save((err, product) => {
//       chai
//         .request(app)
//         .get(`/api/v1/products/storefront/${product._id}`)
//         .send(product)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.product.should.have.property('name');
//           res.body.product.should.have.property('price');
//           res.body.product.should.have.property('image');
//           res.body.product.should.have.property('status');
//           res.body.product.should.have.property('categoryId');
//           res.body.product.should.have.property('description');
//           res.body.product.should.have.property('quantity');
//           res.body.product.should.have.property('createdBy');
//           done();
//         });
//     })

//   });

// });




// // Merchant block
// describe('Test for products under a merchant', () => {
//   var token = null;

//   before(done => {
//     chai
//       .request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'janedoe@yahoo.com',
//         password: 'janedoe'
//       })
//       .end((err, res) => {
//         console.log('token: ', res.body.token)
//         // console.log('res: ', res.status)
//         token = res.body.token;
//         // res.should.have.status(200);
//         done();
//       })
//   });

//   beforeEach((done) => {
//     //After each test, we empty the database
//     Products.remove({}, (err) => {
//       done();
//     })
//   });

//   // Test the /GET route
//   it('it should GET all the products under a merchant', (done) => {
//     chai.request(app)
//       .get('/api/v1/products/merchant')
//       .set("Authorization", `Bearer ${token}`)
//       .set({ "Accept": "application/json" })
//       .end((err, res) => {
//         expect(res).to.exist;
//         res.should.have.status(200);
//         expect(res.statusCode).to.equal(200);
//         done();
//       })
//   })

//   // Test the /POST route
//   it('it should POST a product from a merchant to the database', (done) => {
//     let product = {
//       image: ["https://picsum.photos/id/389/200/200"],
//       status: "available",
//       name: "sports canvas",
//       categoryId: "63c6b11010a9629498d84656",
//       price: "15250",
//       quantity: "10",
//       description: "canvas for early morning jogging",
//       createdBy: "61e175f5b3fec1a25db028ff"
//     }

//     chai
//       .request(app)
//       .post('/api/v1/products/merchant')
//       .set("Authorization", `Bearer ${token}`)
//       .set({ "Accept": "application/json" })
//       .send(product)
//       .end((err, res) => {
//         // console.log('res body: ', res.status)
//         res.should.have.status(201);
//         res.body.should.be.a('object');
//         res.body.product.should.have.property('name');
//         res.body.product.should.have.property('price');
//         done();
//       });
//   });

//   // Test the /GET/:id route
//   it('it should GET a product by the given id for merchant', (done) => {
//     let newProduct = new Products({
//       image: ["https://picsum.photos/id/329/200/200"],
//       status: "available",
//       name: "trainers",
//       categoryId: "63c6b11010a9629498d84656",
//       price: "25000",
//       quantity: "18",
//       description: "unisex trainers",
//       createdBy: "61e175f5b3fec1a25db028ff"
//     });

//     newProduct.save((err, product) => {
//       chai
//         .request(app)
//         .get(`/api/v1/products/merchant/${product._id}`)
//         .set("Authorization", `Bearer ${token}`)
//         .set({ "Accept": "application/json" })
//         .send(product)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.product.should.have.property('name');
//           res.body.product.should.have.property('price');
//           res.body.product.should.have.property('image');
//           res.body.product.should.have.property('status');
//           res.body.product.should.have.property('categoryId');
//           res.body.product.should.have.property('description');
//           res.body.product.should.have.property('quantity');
//           res.body.product.should.have.property('createdBy');
//           done();
//         });
//     })

//   });

//   // Test the /PUT/:id route
//   it('it should UPDATE a product by the given id for merchant', (done) => {
//     let newProduct = new Products({
//       image: ["https://picsum.photos/id/329/200/200"],
//       status: "available",
//       name: "ladies shoes",
//       categoryId: "63c6b11010a9629498d84656",
//       price: "7000",
//       quantity: "20",
//       description: "ladies outing shoes",
//       createdBy: "61e175f5b3fec1a25db028ff"
//     });

//     newProduct.save((err, product) => {
//       chai
//         .request(app)
//         .patch(`/api/v1/products/merchant/${product._id}`)
//         .set("Authorization", `Bearer ${token}`)
//         .set({ "Accept": "application/json" })
//         .send({ 
//           name: "updated to ladies golden shoes",
//           price: "15300",
//           quantity: "7",
//           description: "updated to ladies golden shoes for golden outings and events",
//         })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.product.should.have.property('name');
//           res.body.product.should.have.property('price');
//           res.body.product.should.have.property('image');
//           res.body.product.should.have.property('status');
//           res.body.product.should.have.property('categoryId');
//           res.body.product.should.have.property('description');
//           res.body.product.should.have.property('quantity');
//           res.body.product.should.have.property('createdBy');
//           done();
//         });
//     })

//   });

//   // Test the /PUT/:id route
//   it('it should DELETE a product by the given id for merchant', (done) => {
//     let newProduct = new Products({
//       image: ["https://picsum.photos/id/329/200/200"],
//       status: "available",
//       name: "men's shoes",
//       categoryId: "63c6b11010a9629498d84656",
//       price: "10000",
//       quantity: "9",
//       description: "men's corporate shoes",
//       createdBy: "61e175f5b3fec1a25db028ff"
//     });

//     newProduct.save((err, product) => {
//       chai
//         .request(app)
//         .delete(`/api/v1/products/merchant/${product._id}`)
//         .set("Authorization", `Bearer ${token}`)
//         .set({ "Accept": "application/json" })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.product.should.have.property('name');
//           res.body.product.should.have.property('price');
//           res.body.product.should.have.property('image');
//           res.body.product.should.have.property('status');
//           res.body.product.should.have.property('categoryId');
//           res.body.product.should.have.property('description');
//           res.body.product.should.have.property('quantity');
//           res.body.product.should.have.property('createdBy');
//           res.body.should.have.property('message').eql('Deleted successfully');
//           done();
//         });
//     })

//   });


// });



// // Admin products block
// describe('Test for products on the Admin dashboard', () => {
//   let token = null;

//   before(done => {
//     chai
//       .request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'johndoe@yahoo.com',
//         password: 'johndoe'
//       })
//       .end((err, res) => {
//         console.log('token: ', res.body.token)
//         // console.log('res: ', res.status)
//         token = res.body.token;
//         res.should.have.status(200);
//         done();
//       })
//   });

//   beforeEach((done) => {
//     // Before each test, we empty the database
//     Products.remove({}, (err) => {
//       done();
//     })
//   });

//   // Test the /GET route
//   it('it should GET all the products for the Admin', (done) => {
//     chai.request(app)
//       .get('/api/v1/products/admin')
//       .set("Authorization", `Bearer ${token}`)
//       .set({ "Accept": "application/json" })
//       .end((err, res) => {
//         expect(res).to.exist;
//         res.should.have.status(200);
//         expect(res.statusCode).to.equal(200);
//         done();
//       })
//   })

//   // // Test the /POST route
//   // it('it should POST a product from the Admin to the database', (done) => {
//   //   let product = {
//   //     image: ["https://picsum.photos/id/389/200/200"],
//   //     status: "available",
//   //     name: "sports canvas",
//   //     categoryId: "63c6b11010a9629498d84656",
//   //     price: "15250",
//   //     quantity: "10",
//   //     description: "canvas for early morning jogging",
//   //     createdBy: "61e175f5b3fec1a25db028ff"
//   //   }

//   //   chai
//   //     .request(app)
//   //     .post('/api/v1/products/admin')
//   //     .set("Authorization", `Bearer ${token}`)
//   //     .set({ "Accept": "application/json" })
//   //     .send(product)
//   //     .end((err, res) => {
//   //       res.should.have.status(201);
//   //       res.body.should.be.a('object');
//   //       res.body.product.should.have.property('name');
//   //       res.body.product.should.have.property('price');
//   //       done();
//   //     });
//   // });

//   // Test the /GET/:id route
//   it('it should GET a single product for the Admin', (done) => {
//     let newProduct = new Products({
//       image: ["https://picsum.photos/id/329/200/200"],
//       status: "available",
//       name: "trainers",
//       categoryId: "63c6b11010a9629498d84656",
//       price: "25000",
//       quantity: "18",
//       description: "unisex trainers",
//       createdBy: "61e175f5b3fec1a25db028ff"
//     });

//     newProduct.save((err, product) => {
//       chai
//         .request(app)
//         .get(`/api/v1/products/admin/${product._id}`)
//         .set("Authorization", `Bearer ${token}`)
//         .set({ "Accept": "application/json" })
//         .send(product)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.product.should.have.property('name');
//           res.body.product.should.have.property('price');
//           res.body.product.should.have.property('image');
//           res.body.product.should.have.property('status');
//           res.body.product.should.have.property('categoryId');
//           res.body.product.should.have.property('description');
//           res.body.product.should.have.property('quantity');
//           res.body.product.should.have.property('createdBy');
//           done();
//         });
//     })

//   });

//   // // Test the /PUT/:id route
//   // it('it should UPDATE a product by the Admin', (done) => {
//   //   let newProduct = new Products({
//   //     image: ["https://picsum.photos/id/329/200/200"],
//   //     status: "available",
//   //     name: "ladies shoes",
//   //     categoryId: "63c6b11010a9629498d84656",
//   //     price: "7000",
//   //     quantity: "20",
//   //     description: "ladies outing shoes",
//   //     createdBy: "61e175f5b3fec1a25db028ff"
//   //   });

//   //   newProduct.save((err, product) => {
//   //     chai
//   //       .request(app)
//   //       .patch(`/api/v1/products/admin/${product._id}`)
//   //       .set("Authorization", `Bearer ${token}`)
//   //       .set({ "Accept": "application/json" })
//   //       .send({ 
//   //         name: "updated to ladies golden shoes",
//   //         price: "15300",
//   //         quantity: "7",
//   //         description: "updated to ladies golden shoes for golden outings and events",
//   //       })
//   //       .end((err, res) => {
//   //         res.should.have.status(200);
//   //         res.body.should.be.a('object');
//   //         res.body.product.should.have.property('name');
//   //         res.body.product.should.have.property('price');
//   //         res.body.product.should.have.property('image');
//   //         res.body.product.should.have.property('status');
//   //         res.body.product.should.have.property('categoryId');
//   //         res.body.product.should.have.property('description');
//   //         res.body.product.should.have.property('quantity');
//   //         res.body.product.should.have.property('createdBy');
//   //         done();
//   //       });
//   //   })

//   // });

//   // // Test the /PUT/:id route
//   // it('it should DELETE a product by the Admin', (done) => {
//   //   let newProduct = new Products({
//   //     image: ["https://picsum.photos/id/329/200/200"],
//   //     status: "available",
//   //     name: "men's shoes",
//   //     categoryId: "63c6b11010a9629498d84656",
//   //     price: "10000",
//   //     quantity: "9",
//   //     description: "men's corporate shoes",
//   //     createdBy: "61e175f5b3fec1a25db028ff"
//   //   });

//   //   newProduct.save((err, product) => {
//   //     chai
//   //       .request(app)
//   //       .delete(`/api/v1/products/admin/${product._id}`)
//   //       .set("Authorization", `Bearer ${token}`)
//   //       .set({ "Accept": "application/json" })
//   //       .end((err, res) => {
//   //         res.should.have.status(200);
//   //         res.body.should.be.a('object');
//   //         res.body.product.should.have.property('name');
//   //         res.body.product.should.have.property('price');
//   //         res.body.product.should.have.property('image');
//   //         res.body.product.should.have.property('status');
//   //         res.body.product.should.have.property('categoryId');
//   //         res.body.product.should.have.property('description');
//   //         res.body.product.should.have.property('quantity');
//   //         res.body.product.should.have.property('createdBy');
//   //         res.body.should.have.property('message').eql('Deleted successfully');
//   //         done();
//   //       });
//   //   })

//   // });


// });

