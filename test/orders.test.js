import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../index';

chai.should();

chai.use(chaiHTTP);

describe('Orders', () => {
  /*
    Test /GET Orders route
  */
  describe('/GET order', () => {
    it('it should GET all orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('All orders retrieved successfully');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(3);
          done();
        });
    });
  });
  /*
    Test /POST route
  */
  describe('/POST order', () => {
    it('it should POST an order', (done) => {
      const order = {
        mealId: 3,
        quantity: 5,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Order added successfully');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('mealId').eql(3);
          res.body.data.should.have.property('quantity').eql(5);
          done();
        });
    });
  });
  /*
  Test /GET/:mealId order route
  */
  describe('/GET/:mealId meal', () => {
    it('it should GET an order by a given mealId', (done) => {
      const id = 2;
      chai.request(app)
        .get(`/api/v1/orders/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Success');
          res.body.should.have.property('message').eql('Order retrieved successfully');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('orderedMeal');
          res.body.data.orderedMeal.should.be.a('object');
          res.body.data.orderedMeal.should.have.property('id').eql(2);
          res.body.data.orderedMeal.should.have.property('name');
          res.body.data.orderedMeal.should.have.property('price');
          res.body.data.orderedMeal.should.have.property('description');
          res.body.data.should.have.property('quantity');
          done();
        });
    });
  });
  /*
    Test /PUT route
  */
  // describe('/PUT order', () => {
  //   it('it should UPDATE an order', (done) => {
  //     const order = {
  //       mealId: 3,
  //       quantity: 5,
  //     };
  //     chai.request(app)
  //       .put(`/api/v1/orders/${order.mealId}`)
  //       .send(
  //         {
  //           mealId: 3,
  //           quantity: 4,
  //         },
  //       )
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('status').eql('Success');
  //         res.body.should.have.property('message').eql('Order updated successfully');
  //         res.body.should.have.property('data');
  //         res.body.data.should.be.a('object');
  //         res.body.data.should.have.property('mealId').eql(3);
  //         res.body.data.should.have.property('quantity').eql(4);
  //         done();
  //       });
  //   });
  // });
  // /*
  //   Test /PUT/:mealId Meal route
  // */
  // describe('/DELETE/:mealId order', () => {
  //   it('it should DELETE an order by a given mealId', (done) => {
  //     // const meal = {
  //     //   id: 3,
  //     //   name: 'Jollof rice with salad',
  //     //   price: '300',
  //     //   description: 'A little description',
  //     // };
  //     const id = 1;
  //     chai.request(app)
  //       .delete(`/api/v1/orders/${id}`)
  //       .end((err, res) => {
  //         res.should.have.status(204);
  //         done();
  //       });
  //   });
  // });
});
