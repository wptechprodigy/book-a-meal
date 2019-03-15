import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import app from '../api/index';
import User from '../api/models/user';
import Caterer from '../api/models/caterer';
import Meal from '../api/models/meals';

chai.should();

chai.use(chaiHTTP);

const secret = process.env.JWT_SECRET;

const URL_PREFIX = '/api/v1';

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

before((done) => {
  User.create(userPayload)
    .then(() => Caterer.create(catererPayload))
    .then(() => {
      done();
    });
});

describe('Menu Endpoints', () => {
  describe('Get all Menus (User)', () => {
    it(`it should not allow an unauthorized fetch of menus`, done => {
      chai
        .request(app)
        .get(`${URL_PREFIX}/menu/`)
        .then(res => {
          res.should.have.status(401);
          res.body.should.have.property('status').eql('error');
          done();
        })
        .catch(err => console.log('GET /menu/', err.message));
    });
    it(`it should allow an authorized access to all menus`, done => {
      User.findOne({ where: { email: userPayload.email } }).then(user => {
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
          .get(`${URL_PREFIX}/menu/`)
          .set('Authorization', `Bearer ${token}`)
          .then(res => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('Success');
            done();
          })
          .catch(err => console.log('GET /menu/', err.message));
      });
    });
  });

  describe(`Get Caterer's own Menu (Caterer)`, () => {
    it(`it should not allow an unauthorized caterer to menu`, done => {
      chai
        .request(app)
        .get(`${URL_PREFIX}/menu/caterer`)
        .then(res => {
          res.should.have.status(401);
          res.body.should.have.property('status').eql('error');
          done();
        })
        .catch(err => console.log('GET /menu/caterer', err.message));
    });
    it(`it should allow an authorized caterer to fetch own menu`, done => {
      Caterer.findOne({ where: { email: catererPayload.email } }).then(caterer => {
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
          .get(`${URL_PREFIX}/menu/caterer`)
          .set('Authorization', `Bearer ${token}`)
          .then(res => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('Success');
            done();
          })
          .catch(err => console.log('GET /menu/caterer', err.message));
      });
    });
  });

  describe('Add Meal To Menu (Caterer)', () => {
    Caterer.create(caterer2Payload)
      .then(caterer => {
        return Meal.create({
          name: 'Test Meal',
          price: '500',
          description: 'A little meal description',
          imageUrl: 'img.png',
          catererId: caterer.id,
        });
      })
      .then(meal => {
        const mealId = meal.id;
        it(`it should not allow an unauthorized access to add meal`, done => {
          chai
            .request(app)
            .post(`${URL_PREFIX}/menu/`)
            .send({
              mealId,
              quantity: 2,
            })
            .then(res => {
              res.should.have.status(401);
              res.body.should.have.property('status').eql('error');
              done();
            })
            .catch(err => console.log('POST /menu/', err.message));
        });
        it(`it should test to validate access to add meal to menu`, done => {
          Caterer.findOne({ where: { email: caterer2Payload.email } }).then(caterer => {
            const token = jwt.sign(
              {
                caterer: {
                  id: caterer.id,
                  name: caterer.name,
                  email: caterer.email,
                  phone: caterer.phone,
                },
              },
              secret,
              {
                expiresIn: 86400,
              }
            );
            chai
              .request(app)
              .post(`${URL_PREFIX}/menu/`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                mealId
              })
              .then(res => {
                res.should.have.status(400);
                res.body.should.have.property('status').eql('error');
                done();
              })
              .catch(err => console.log('POST /menu/', err.message));
          });
        });
        it(`it should permit addition of meal without a meal id`, done => {
          Caterer.findOne({ where: { email: caterer2Payload.email } }).then(caterer => {
            const token = jwt.sign(
              {
                caterer: {
                  id: caterer.id,
                  name: caterer.name,
                  email: caterer.email,
                  phone: caterer.phone,
                },
              },
              secret,
              {
                expiresIn: 86400,
              }
            );
            chai
              .request(app)
              .post(`${URL_PREFIX}/menu/`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                mealId: 10000000,
                quantity: 10,
              })
              .then(res => {
                res.should.have.status(500);
                res.body.should.have.property('status').eql('error');
                done();
              })
              .catch(err => console.log('POST /menu/', err.message));
          });
        });
        it(`it should allow an authorized caterer to add meal to menu`, done => {
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
                .post(`${URL_PREFIX}/menu/`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                  mealId,
                  quantity: 2
                })
                .then(res => {
                  res.should.have.status(200);
                  res.body.should.have.property('status').eql('Success');
                  done();
                })
                .catch(err => console.log('POST /menu/', err.message));
            })
            .catch(err => console.log(err.message));
        });
        it(`it should allow an authorized caterer to update a menu`, done => {
          Caterer.findOne({ where: { email: caterer2Payload.email } }).then(caterer => {
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
              .post(`${URL_PREFIX}/menu/`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                mealId,
                quantity: 2
              })
              .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('Success');
                res.body.data[0].should.have.property('quantity').eql(4);
                Meal.destroy({ where: { id: mealId } }).then(() => {
                  done();
                });
              })
              .catch(err => console.log('POST /menu/', err.message));
          });
        });
      })
      .catch(err => console.log(err.message));
  });
});

after(done => {
  User.destroy({ where: { email: userPayload.email } })
    .then(async () => {
      await Caterer.destroy({ where: { email: caterer2Payload.email } });
      return Caterer.destroy({ where: { email: catererPayload.email } });
    })
    .then(() => {
      done();
    });
});
