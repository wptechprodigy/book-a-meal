import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../index';
import menus from '../api/utils/dummyDBData';

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
 Test /GET/:availableOn Meals route
*/
  describe('/GET/:availableOn menu', () => {
    it('it should GET a menu', (done) => {
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
          done();
        });
    });
  });
  /*
    Test /POST route
  */
  describe('/POST menu', () => {
    it('it should POST a meal for a menu', (done) => {
      const menu = {
        availableOn: '02-27-2019',
        mealOption: {
          id: 4,
          name: 'Salad with plantain',
          price: '350',
          description: 'A little description',
        },
      };
      chai.request(app)
        .post('/api/v1/menus')
        .set('Accept', 'application/json')
        .send(menu)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Meal option added to menu successfully');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
