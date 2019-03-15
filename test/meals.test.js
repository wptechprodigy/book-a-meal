import fs from 'fs';
import path from 'path';
import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import app from '../api/index';
import Caterer from '../api/models/caterer';
import User from '../api/models/user';
import Meal from '../api/models/meals';

const secret = process.env.JWT_SECRET;

chai.should();

chai.use(chaiHTTP);

const URL_PREFIX = '/api/v1';

const srcImg = './test_images/test.png';
const imgFolder = './api/images';

const duplicateImage = (filename = 'fake.png') => new Promise((resolve, reject) => {
  fs.access(imgFolder, (err) => {
    const readStream = fs.createReadStream(srcImg);
    readStream.once('error', (error) => {
      reject(error.message);
    });
    readStream.pipe(fs.createWriteStream(path.join(imgFolder, filename)));
    if (err) reject(err.message);
  });
  resolve(true);
});

const userPayload = {
  name: 'Sanni Bello',
  email: 'sanni@testdomain.com',
  password: 'password',
};

const catererPayload = {
  name: 'Sanni Bello',
  email: 'sanni-caterer@testdomain.com',
  phone: '09012345678',
  password: 'catererpass',
};

const caterer2Payload = {
  name: 'Sanni Bello',
  email: 'sanni-caterer2@testdomain.com',
  phone: '09012345678',
  password: 'catererpass2',
};

const caterer3Payload = {
  name: 'Sanni Ajayi',
  email: 'ajayisannicaterer@testdomain.com',
  phone: '09012345678',
  password: 'caterer3pass',
};

before((done) => {
  Caterer.create(catererPayload)
    .then(() => User.create(userPayload))
    .then(() => {
      done();
    });
});

describe('Meals Endpoints with Auth', () => {
  /*
    Test /GET Meals route
  */
  describe('Get all Meals (Caterer)', () => {
    it(`it should not allow an unauthorized fetch of all meals`, done => {
      chai
        .request(app)
        .get(`${URL_PREFIX}/meals/`)
        .then(res => {
          res.should.have.status(401);
          res.body.should.have.property('status').eql('error');
          done();
        })
        .catch(err => console.log('GET /meals/', err.message));
    });
    it(`it should not allow an unauthorized access for users`, done => {
      User.findOne({ where: { email: userPayload.email } })
        .then(user => {
          const { id, name, email } = user;
          const token = jwt.sign(
            {
              user: { id, name, email }
            },
            secret,
            {
              expiresIn: 86400
            }
          );
          chai
            .request(app)
            .get(`${URL_PREFIX}/meals/`)
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
              res.should.have.status(401);
              res.body.should.have.property('status').eql('error');
              done();
            })
            .catch(err => console.log('GET /meals/', err.message));
        })
        .catch(err => console.log(err.message));
    });
    it(`it should fetch all meals for an authorized caterer`, done => {
      Caterer.findOne({ where: { email: catererPayload.email } })
        .then(caterer => {
          const { id, name, email, phone } = caterer;
          const token = jwt.sign(
            {
              caterer: { id, name, email, phone },
            },
            secret,
            {
              expiresIn: 86400
            }
          );
          chai
            .request(app)
            .get(`${URL_PREFIX}/meals/`)
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('Success');
              res.body.should.have.property('message').eql('Meals retrieved successfully');
              done();
            })
            .catch(err => console.log('GET /meals/', err.message));
        })
        .catch(err => console.log(err.message));
    });
  });
  /*
    Test /POST route
  */
  describe('POST /meals/ Add a meal by a caterer', () => {
    it(`it should not allow meal to be added if unauthorized`, done => {
      chai
        .request(app)
        .post(`${URL_PREFIX}/meals/`)
        .send({
          name: 'Test Meal',
          price: '500',
          description: 'A little meal description',
        })
        .then(res => {
          res.should.have.status(401);
          res.body.should.have.property('status').eql('error');
          done();
        })
        .catch(err => console.log('POST /meals/', err.message));
    });
    it(`it should validate caterer before ability to add a meal option`, done => {
      Caterer.findOne({ where: { email: catererPayload.email } })
        .then(caterer => {
          const token = jwt.sign(
            {
              caterer: {
                id: caterer.id,
                name: caterer.name,
                email: caterer.email,
                phone: caterer.phone
              },
            },
            secret,
            {
              expiresIn: 86400
            }
          );
          chai
            .request(app)
            .post(`${URL_PREFIX}/meals/`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              name: 'Test Meal',
              price: '500',
              description: 'A little meal description',
            })
            .then(res => {
              res.should.have.status(401);
              res.body.should.have.property('status').eql('error');
              done();
            })
            .catch(err => console.log('POST /meals/', err.message));
        })
        .catch(err => console.log(err.message));
    });
    it(`it should allow caterer with validation to add a meal option)`, done => {
      Caterer.findOne({ where: { email: catererPayload.email } })
        .then(caterer => {
          const token = jwt.sign(
            {
              caterer: {
                id: caterer.id,
                name: caterer.name,
                email: caterer.email,
                phone: caterer.phone
              },
            },
            secret,
            {
              expiresIn: 86400
            }
          );
          chai
            .request(app)
            .post(`${URL_PREFIX}/meals/`)
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'Test Meal')
            .field('price', '500')
            .field('description', 'A little meal description')
            .attach('image', './test_images/test.png', 'test.png')
            .then(res => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('Success');
              res.body.should.have.property('message').eql('Meal option added successfully');
              done();
            })
            .catch(err => console.log('POST /meals/', err.message));
        })
        .catch(err => console.log(err.message));
    });
  });

  describe('Modify Meal Option (Caterer)', () => {
    duplicateImage()
      .then(() => {
        Caterer.create(caterer2Payload).then(caterer => {
          return Meal.create({
            name: 'Fake Meal',
            price: 1000,
            imageUrl: '/api/images/fake.png',
            catererId: caterer.id
          }).then(meal => {
            it(`it should not allow an unauthorized modification of meal`, done => {
              chai
                .request(app)
                .put(`${URL_PREFIX}/meals/${meal.id}`)
                .send({
                  name: 'Test Meal 2',
                  price: 600
                })
                .then(res => {
                  res.should.have.status(401);
                  res.body.should.have.property('status').eql('error');
                  done();
                })
                .catch(err => console.log('PUT /meals/:mealId', err.message));
            });
            it(`it should validate the caterer to allow for modification /meals/:mealId`, done => {
              Caterer.findOne({ where: { email: caterer2Payload.email } })
                .then(caterer => {
                  const token = jwt.sign(
                    {
                      caterer: {
                        id: caterer.id,
                        name: caterer.name,
                        email: caterer.email,
                        phone: caterer.phone
                      },
                    },
                    secret,
                    {
                      expiresIn: 86400
                    }
                  );
                  chai
                    .request(app)
                    .put(`${URL_PREFIX}/meals/${meal.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                      name: 300
                    })
                    .then(res => {
                      res.should.have.status(401);
                      res.body.should.have.property('status').eql('error');
                      done();
                    })
                    .catch(err => console.log('POST /meals/', err.message));
                })
                .catch(err => console.log(err.message));
            });
            it(`it should allow caterer to modify meal option /meals/:mealId)`, done => {
              Caterer.findOne({ where: { email: caterer2Payload.email } })
                .then(caterer => {
                  const token = jwt.sign(
                    {
                      caterer: {
                        id: caterer.id,
                        name: caterer.name,
                        email: caterer.email,
                        phone: caterer.phone
                      },
                    },
                    secret,
                    {
                      expiresIn: 86400
                    }
                  );
                  chai
                    .request(app)
                    .put(`${URL_PREFIX}/meals/${meal.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .field('name', 'Test Meal 2')
                    .field('price', '600')
                    .field('description', 'A little meal description')
                    .attach('image', './test_images/test2.jpg', 'test2.jpg')
                    .then(res => {
                      res.should.have.status(200);
                      res.body.should.have.property('status').eql('success');
                      res.body.should.have.property('message').eql('Meal updated successfully');
                      res.body.should.have.property('data');
                      fs.unlink('./api/images/test2.jpg', err => {
                        if (err) console.log(err.message);
                      });
                      Meal.destroy({ where: { id: meal.id } }).then(() => {
                        done();
                      });
                    })
                    .catch(err => console.log('POST /meals/', err.message));
                })
                .catch(err => console.log(err.message));
            });
          });
        });
      })
      .catch(err => console.log(err.message));
  });
  /*
    Test /DELETE/:mealId Meal route
  */
  describe('Delete Meal Option (Caterer)', () => {
    duplicateImage('fake2.png')
      .then(() => {
        Caterer.create(caterer3Payload)
          .then(caterer => {
            return Meal.create({
              name: 'Fake Meal',
              price: 1000,
              imageUrl: '/api/images/fake2.png',
              catererId: caterer.id
            });
          })
          .then(meal => {
            it(`it should not allow an unauthorized delete`, done => {
              chai
                .request(app)
                .delete(`${URL_PREFIX}/meals/${meal.id}`)
                .then(res => {
                  res.should.have.status(401);
                  res.body.should.have.property('status').eql('error');
                  done();
                })
                .catch(err => console.log('DELETE /meals/:mealId', err.message));
            });
            it(`it should not be able to delete a meal option, if it doesn't exist`, done => {
              Caterer.findOne({ where: { email: caterer3Payload.email } })
                .then(caterer => {
                  const { id, name, email, phone } = caterer;
                  const token = jwt.sign(
                    {
                      caterer: { id, name, email, phone },
                    },
                    secret,
                    {
                      expiresIn: 86400
                    }
                  );
                  chai
                    .request(app)
                    .delete(`${URL_PREFIX}/meals/${100000}`)
                    .set('Authorization', `Bearer ${token}`)
                    .then(res => {
                      res.should.have.status(500);
                      res.body.should.have.property('status').eql('error');
                      done();
                    })
                    .catch(err => console.log('DELETE /meals/:mealId', err.message));
                })
                .catch(err => console.log(err.message));
            });
            it(`it should allow an authorized caterer to delete a meal option`, done => {
              Caterer.findOne({ where: { email: caterer3Payload.email } })
                .then(caterer => {
                  const { id, name, email, phone } = caterer;
                  const token = jwt.sign(
                    {
                      caterer: { id, name, email, phone },
                    },
                    secret,
                    {
                      expiresIn: 86400
                    }
                  );
                  chai
                    .request(app)
                    .delete(`${URL_PREFIX}/meals/${meal.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .then(res => {
                      res.should.have.status(200);
                      res.body.should.have.property('status').eql('success');
                      res.body.should.have.property('message').eql('Meal option deleted successfully');
                      res.body.should.have.property('data');
                      done();
                    })
                    .catch(err => console.log('DELETE /meals/:mealId', err.message));
                })
                .catch(err => console.log(err.message));
            });
          });
      })
      .catch(err => console.log(err.message));
  });
});

after(done => {
  Caterer.destroy({ where: { email: catererPayload.email } })
    .then(async () => {
      await Caterer.destroy({ where: { email: caterer3Payload.email } });
      await Caterer.destroy({ where: { email: caterer2Payload.email } });
      return User.destroy({ where: { email: userPayload.email } });
    })
    .then(() => {
      done();
    });
});
