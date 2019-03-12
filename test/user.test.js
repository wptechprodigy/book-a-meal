import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';
import User from '../api/models/user';

chai.should();

chai.use(chaiHTTP);

const URL_PREFIX = '/api/v1';

before((done) => {
  done();
});

describe('User Authentication Endpoints', () => {
  describe('/POST Auth Signup - /auth/signup', () => {
    it('it should test for required user credentials (password test) for sign up', (done) => {
      const user = {
        name: 'Sanni Bello',
        email: 'sanni@testdomain.com',
      };
      chai
        .request(app)
        .set('Accept', 'application/json')
        .post(`${URL_PREFIX}/auth/signup`)
        .send(user)
        .then((res) => {
          res.should.have.status(500);
          res.body.should.have.status('error');
          res.body.should.be.a('validation');
          done();
        })
        .catch(err => console.log('/POST Auth Signup - /auth/signup', err.message));
    });
    it('it should test for required user credentials (email test) for sign up', (done) => {
      const user = {
        name: 'Sanni Bello',
        email: 'sanni',
      };
      chai
        .request(app)
        .set('Accept', 'application/json')
        .post(`${URL_PREFIX}/auth/signup`)
        .send(user)
        .then((res) => {
          res.should.have.status(500);
          res.body.should.have.status('error');
          res.body.should.be.a('validation');
          done();
        })
        .catch(err => console.log('POST /auth/signup', err.message));
    });
    it('it should allow user sign up with complete details', (done) => {
      const user = {
        name: 'Sanni Bello',
        email: 'sanni@testdomain.com',
        password: 'password',
      };
      chai
        .request(app)
        .set('Accept', 'application/json')
        .post(`${URL_PREFIX}/auth/signup`)
        .send(user)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Resgistration successful');
          res.body.should.have.property('user').eql(user);
          done();
        })
        .catch(err => console.log('POST /auth/signup', err.message));
    });
  });

  describe('Login /POST /auth/login', () => {
    it('it should validate user login credentials (password test)', (done) => {
      chai
        .request(app)
        .set('Accept', 'application/json')
        .post(`${URL_PREFIX}/auth/login`)
        .send({
          email: 'sanni@testdomain.com',
        })
        .then((res) => {
          res.should.have.status(400);
          res.body.should.have.status('error');
          res.body.should.be.a('validation');
          done();
        })
        .catch(err => console.log('Login - POST /auth/login', err.message));
    });
    it('it should validate user login credentials (email test)', (done) => {
      const user = {
        email: 'sanni',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/login`)
        .set('Accept', 'application/json')
        .send(user)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.have.status('error');
          res.body.should.be.a('validation');
          done();
        })
        .catch(err => console.log('Login - POST /auth/login', err.message));
    });
    it('it should not allow non-registered user to login', (done) => {
      const user = {
        email: 'notregistered@email.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/login`)
        .set('Accept', 'application/json')
        .send(user)
        .then((res) => {
          res.should.have.status(500);
          res.body.should.have.status('error');
          done();
        })
        .catch(err => console.log('Login - POST /auth/login', err.message));
    });
    it('POST /auth/login - User Can Login', (done) => {
      const user = {
        email: 'sanni@testdomain.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/login`)
        .set('Accept', 'application/json')
        .send(user)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Log-in successful');
          done();
        })
        .catch(err => console.log('Login - POST /auth/login', err.message));
    });
    it("it should not permit login with incorrect password", (done) => {
      const user = {
        email: 'sanni@testdomain.com',
        password: 'password132',
      };
      chai
        .request(app)
        .post(`${URL_PREFIX}/auth/login`)
        .set('Accept', 'application/json')
        .send(user)
        .then((res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('Log-in failed');
          done();
        })
        .catch(err => console.log('Login - POST /auth/login', err.message));
    });
  });
});

after((done) => {
  User.destroy({ where: { email: 'sanni@testdomain.com' } }).then(() => {
    done();
  });
});
