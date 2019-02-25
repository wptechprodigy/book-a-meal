import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../index';

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
  /*
    Test /POST route
  */
  describe('/POST meal', () => {
    it('it should POST a meal', (done) => {
      const meal = {
        id: 3,
        name: 'Jollof rice with salad',
        price: '300',
        description: 'A little description',
      };
      chai.request(app)
        .post('/api/v1/meals')
        .send(meal)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Meal option added successfully');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('name');
          res.body.data.should.have.property('price');
          res.body.data.should.have.property('description');
          done();
        });
    });
  });
  /*
  Test /GET/:mealId Meals route
*/
  describe('/GET/:mealId meal', () => {
    it('it should GET a meal by a given mealId', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/meals/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Retrieved meal successfully');
          res.body.should.have.property('data');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('name');
          res.body.data.should.have.property('price');
          res.body.data.should.have.property('description');
          done();
        });
    });
  });
  /*
    Test /PUT/:mealId Meal route
  */
  describe('/DELETE/:mealId meal', () => {
    it('it should DELETE a meal by a given mealId', (done) => {
      // const meal = {
      //   id: 3,
      //   name: 'Jollof rice with salad',
      //   price: '300',
      //   description: 'A little description',
      // };
      const id = 1;
      chai.request(app)
        .delete(`/api/v1/meals/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
