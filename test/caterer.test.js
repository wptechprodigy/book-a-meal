import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';
import Caterer from '../api/models/caterer';

const { assert, expect, use } = chai;

use(chaiHTTP);

const URL_PREFIX = '/api/v1';

before((done) => {
  app.on('dbConnected', () => {
    done();
  });
});

beforeEach((done) => {
  done();
});
describe('Caterer Auth Endpoints', () => {
  context('Signup', () => {
    it('POST /auth/caterer/signup - Caterer SignUp Validation Test', (done) => {
      const caterer = {
        name: 'Sanni Bello',
        email: 'sanni@testdomain.com',
        phone: '09012345678',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/caterer/signup`)
        .send(caterer)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.have.status('error');
          res.body.should.be.a('validation');
          done();
        })
        .catch(err => console.log('POST /auth/caterer/signup', err.message));
    });
    it('POST /auth/caterer/signup - Caterer Can Sign Up', (done) => {
      const caterer = {
        name: 'Sanni Bello',
        email: 'sanni@testdomain.com',
        phone: '09012345678',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/caterer/signup`)
        .send(caterer)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Resgistration successful');
          res.body.should.have.property('token');
          res.body.should.have.property('user').eql(caterer);
          done();
        })
        .catch(err => console.log('POST /auth/caterer/signup', err.message));
    });
    it("POST /auth/caterer/signup - Caterer Can't signup again with the same email", (done) => {
      const caterer = {
        name: 'Sanni Bello',
        email: 'sanni@testdomain.com',
        phone: '09012345678',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/caterer/signup`)
        .send(caterer)
        .then((res) => {
          res.should.have.status(500);
          res.body.should.have.status('error');
          done();
        })
        .catch(err => console.log('POST /auth/caterer/signup', err.message));
    });
  });

  describe('Login', () => {
    it('POST /auth/caterer/login - Caterer Login Validation Test(Required)', (done) => {
      const caterer = {
        email: 'sanni@testdomain.com',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/caterer/login`)
        .send(caterer)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.have.status('error');
          res.body.should.be.a('validation');
          done();
        })
        .catch(err => console.log('POST /auth/caterer/login', err.message));
    });
    it('POST /auth/caterer/login - Caterer Cannot Login without being registered', (done) => {
      const caterer = {
        email: 'nonregistered@testdomain.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/caterer/login`)
        .send(caterer)
        .then((res) => {
          res.should.have.status(500);
          res.body.should.have.status('error');
          done();
        })
        .catch(err => console.log('POST /auth/caterer/login', err.message));
    });
    it('POST /auth/caterer/login - Caterer Can Login', (done) => {
      const caterer = {
        email: 'sanni@testdomain.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/caterer/login`)
        .send(caterer)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Log-in successful');
          res.body.should.have.property('token');
          res.body.should.have.property('user');
          done();
        })
        .catch(err => console.log('POST /auth/caterer/login', err.message));
    });
    it("POST /auth/caterer/login - Caterer Can't login with incorrect password", (done) => {
      const caterer = {
        email: 'sanni@testdomain.com',
        password: 'password131',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/caterer/login`)
        .send(caterer)
        .then((res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('Log-in failed');
          done();
        })
        .catch(err => console.log('POST /auth/caterer/login', err.message));
    });
  });
});

after((done) => {
  Caterer.destroy({ where: { email: 'sanni@testdomain.com' } }).then(() => {
    done();
  });
});
