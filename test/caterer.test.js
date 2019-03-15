import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';
import Caterer from '../api/models/caterer';

chai.should();

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
describe('Caterer Endpoints Authentication', () => {
  // Caterer signup
  describe('POST /auth/caterer/signup', () => {
    it('it should not allow caterer to signup without password', (done) => {
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
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('type').eql('validation');
          done();
        })
        .catch(err => console.log('POST /auth/caterer/signup', err.message));
    });
    it('it should allow caterer signup with complete details', (done) => {
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
          res.body.should.have.property('message').eql('Registration successful');
          res.body.should.have.property('token');
          res.body.should.have.property('user').eql(caterer);
          done();
        })
        .catch(err => console.log('POST /auth/caterer/signup', err.message));
    });
    it('it should not allow caterer signup with same details', (done) => {
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

  describe('Login POST /auth/caterer/login', () => {
    it('it should not allow caterer to login without password', (done) => {
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
    it('it should not allow login without prior registration', (done) => {
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
    it('it should allow caterer to login with complete details', (done) => {
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
    it('it should not allow login using an incorrect password', (done) => {
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
