import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../index';

chai.should();

chai.use(chaiHTTP);

describe('Menus', () => {
  /*
    Test /GET menu route
  */
  describe('/GET menu', () => {
    it('it should GET all menus', (done) => {
      chai.request(app)
        .get('/api/v1/menus')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('All menus were retrieved successfully');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(1);
          done();
        });
    });
  });
  /*
 Test /GET/:mealId Meals route
*/
  describe('/GET/:availableOn meal', () => {
    it('it should GET a meal by a given mealId', (done) => {
      const availableOn = '26-02-19';
      chai.request(app)
        .get(`/api/v1/menus/${availableOn}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Menu retrieved successfully');
          res.body.should.have.property('data');
          res.body.should.be.a('object');
          res.body.data.should.have.property('availableOn').eql('26-02-19');
          res.body.data.should.have.property('mealOptions');
          res.body.data.mealOptions.should.be.a('array');
          done();
        });
    });
  });
});
