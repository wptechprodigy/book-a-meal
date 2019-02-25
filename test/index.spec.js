import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../index';
// import Meal from '../api/models/meal.models';

chai.should();

chai.use(chaiHTTP);

describe('Meals', () => {
  /*
    Test /GET Meals route
  */
  describe('/GET meal', () => {
    it('it should GET all meals', (done) => {
      chai.request(app)
        .get('/api/v1/meals')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Meals retrieved successfully');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(4);
          done();
        });
    });
  });
});
