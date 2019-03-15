import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import app from '../api/index';
import User from '../api/models/user';
import Caterer from '../api/models/caterer';
import Meal from '../api/models/meals';
import Menu from '../api/models/menu';

const secret = process.env.JWT_SECRET;

chai.should();

chai.use(chaiHTTP);

const URL_PREFIX = '/api/v1';

const userPayload = {
	name: 'Sanni Bello',
	email: 'sanni@testdomain.com',
	password: 'password',
};

const user2Payload = {
	name: 'Sanni Ajanaku',
	email: 'sanniaj@testdomain.com',
	password: 'password',
};

const user3Payload = {
	name: 'Ajani Alekunla',
	email: 'alekunla@testdomain.com',
	password: 'password',
};

const user4Payload = {
	name: 'Ajayi Bello',
	email: 'abello@testdomain.com',
	password: 'password',
};

const user5Payload = {
	name: 'Samiat Alabede',
	email: 'samialabede@testdomain.com',
	password: 'password',
};

const catererPayload = {
	name: 'Sanni Bello',
	email: 'sanni@testdomain.com',
	phone: '09012345678',
	password: 'password',
};

const caterer2Payload = {
	name: 'Alabede Oniresi',
	email: 'a_oniresi@testdomain.com',
	phone: '09012345678',
	password: 'password',
};

const caterer3Payload = {
	name: 'Bello Gidado',
	email: 'gidadob@test2domain.com',
	phone: '09012345678',
	password: 'password',
};

const caterer4Payload = {
	name: 'Bello Gideon',
	email: 'giddybello@test2domain.com',
	phone: '09012345678',
	password: 'password',
};

const caterer5Payload = {
	name: 'Bright Osadolo',
	email: 'bosadolo@test2domain.com',
	phone: '09012345678',
	password: 'password',
};

before(done => {
	User.create(userPayload)
		.then(() => {
			return Caterer.create(catererPayload);
		})
		.then(() => {
			done();
		});
});

describe('Order Endpoints', () => {
	describe('Get all Orders (Caterer)', () => {
		it(`it should not allow an unauthorized fetch of all orders`, done => {
			chai
				.request(app)
				.get(`${URL_PREFIX}/orders`)
				.then(res => {
					res.should.have.status(401);
					res.body.should.have.property('status').eql('error');
					done();
				})
				.catch(err => console.log('GET /orders', err.message));
		});
		it(`it should allow an authorized caterer to get all orders`, done => {
			Caterer.findOne({ where: { email: catererPayload.email } })
				.then(caterer => {
					const { id, name, email, phone } = caterer;
					const token = jwt.sign(
						{
							caterer: { id, name, email, phone },
						},
						secret,
						{
							expiresIn: 86400,
						},
					);
					chai
						.request(app)
						.get(`${URL_PREFIX}/orders`)
						.set('Authorization', `Bearer ${token}`)
						.then(res => {
							res.should.have.status(200);
              res.body.should.be.a('object');
							res.body.should.have.property('status').eql('success');
							done();
						})
						.catch(err => console.log('GET /orders', err.message));
				})
				.catch(err => console.log(err.errors[0].name));
		});
	});

	describe('Add to Orders (User)', () => {
		Caterer.create(caterer2Payload)
			.then(caterer => {
				return Meal.create({
					name: 'Rice and beans',
					price: 350,
					imageUrl: 'fk.png',
					catererId: caterer.id,
				});
			})
			.then(meal => {
				it(`it should not allow an unauthorized user to add orders`, done => {
					chai
						.request(app)
						.post(`${URL_PREFIX}/orders`)
						.send({
							mealId: meal.id,
							quantity: 1,
						})
						.then(res => {
							res.should.have.status(401);
							res.body.should.have.property('status').eql('error');
							done();
						})
						.catch(err => console.log('POST /orders', err.message));
				});
				it(`it should validate a user before authorization`, done => {
					User.findOne({ where: { email: userPayload.email } }).then(user => {
						const { id, name, email } = user;
						const token = jwt.sign(
							{
								user: { id, name, email },
							},
							secret,
							{
								expiresIn: 86400,
							},
						);
						chai
							.request(app)
							.post(`${URL_PREFIX}/orders`)
							.set('Authorization', `Bearer ${token}`)
							.send({
								mealId: meal.id,
							})
							.then(res => {
								res.should.have.status(400);
								res.body.should.have.property('status').eql('error');
								done();
							})
							.catch(err => console.log('POST /orders', err.message));
					});
				});
				it(`it should allow an authorized user to add order`, done => {
					User.findOne({ where: { email: userPayload.email } }).then(user => {
						const { id, name, email } = user;
						const token = jwt.sign(
							{
								user: { id, name, email },
							},
							secret,
							{
								expiresIn: 86400,
							},
						);
						chai
							.request(app)
							.post(`${URL_PREFIX}/orders`)
							.set('Authorization', `Bearer ${token}`)
							.send({
								mealId: meal.id,
								quantity: 1,
							})
							.then(res => {
								res.should.have.status(200);
                res.body.should.be.a('object');
								res.body.should.have.property('status').eql('success');
								done();
							})
							.catch(err => console.log('POST /orders', err.message));
					});
				});
				it(`it should not allow user to alter order via this route`, done => {
					User.findOne({ where: { email: userPayload.email } }).then(user => {
						const { id, name, email } = user;
						const token = jwt.sign(
							{
								user: { id, name, email },
							},
							secret,
							{
								expiresIn: 86400,
							},
						);
						chai
							.request(app)
							.post(`${URL_PREFIX}/orders`)
							.set('Authorization', `Bearer ${token}`)
							.send({
								mealId: meal.id,
								quantity: 1,
							})
							.then(res => {
								res.should.have.status(200);
                res.body.should.be.a('object');
								res.body.should.have.property('status').eql('warning');
								Meal.destroy({ where: { id: meal.id } }).then(() => {
									done();
								});
							})
							.catch(err => console.log('POST /orders', err.message));
					});
				});
			})
			.catch(err => console.log(err.message));
	});

	describe('Modify Orders (Users)', () => {
		Caterer.create(caterer3Payload)
			.then(caterer => {
				return Meal.create({
					name: 'Amala with gbegiri',
					price: 400,
					quantity: 3,
					imageUrl: 'fk.png',
					catererId: caterer.id,
				});
			})
			.then(meal => {
				User.create(user2Payload)
					.then(user => {
						return Order.create({ mealId: meal.id, quantity: 4, userId: user.id });
					})
					.then(orderItem => {
						it(`it should not allow an unauthorized modification of orders`, done => {
							chai
								.request(app)
								.put(`${URL_PREFIX}/orders/${order.id}`)
								.send({
									action: 'increase',
								})
								.then(res => {
									res.should.have.status(401);
									res.body.should.have.property('status').eql('error');
									done();
								})
								.catch(err => console.log('PUT /orders/:orderId', err.message));
						});
						it(`it should validate user before authorization to modify an order`, done => {
							User.findOne({ where: { email: user2Payload.email } }).then(user => {
								const { id, name, email } = user;
								const token = jwt.sign(
									{
										user: { id, name, email },
									},
									secret,
									{
										expiresIn: 86400,
									},
								);
								chai
									.request(app)
									.put(`${URL_PREFIX}/orders/${order.id}`)
									.set('Authorization', `Bearer ${token}`)
									.send({
										action: 'something',
									})
									.then(res => {
										res.should.have.status(400);
										res.body.should.have.property('status').eql('error');
										done();
									})
									.catch(err => console.log('PUT /orders/:orderId', err.message));
							});
						});
						it(`it should allow an authorized user to increase order quantity`, done => {
							User.findOne({ where: { email: user2Payload.email } }).then(user => {
								const { id, name, email } = user;
								const token = jwt.sign(
									{
										user: { id, name, email },
									},
									secret,
									{
										expiresIn: 86400,
									},
								);
								chai
									.request(app)
									.put(`${URL_PREFIX}/orders/${order.id}`)
									.set('Authorization', `Bearer ${token}`)
									.send({
										action: 'increase',
									})
									.then(res => {
										res.should.have.status(200);
                    res.body.should.be.a('object');
										res.body.should.have.property('status').eql('success');
										done();
									})
									.catch(err => console.log('PUT /orders/:orderId', err.message));
							});
						});
            it(`it should allow an authorized user to decrease order quantity`, done => {
							User.findOne({ where: { email: user2Payload.email } }).then(user => {
								const { id, name, email } = user;
								const token = jwt.sign(
									{
										user: { id, name, email },
									},
									secret,
									{
										expiresIn: 86400,
									},
								);
								chai
									.request(app)
									.put(`${URL_PREFIX}/orders/${order.id}`)
									.set('Authorization', `Bearer ${token}`)
									.send({
										action: 'decrease',
									})
									.then(res => {
										res.should.have.status(200);
                    res.body.should.be.a('object');
										res.body.should.have.property('status').eql('success');
										done();
									})
									.catch(err => console.log('PUT /orders/:orderId', err.message));
							});
						});
            it(`it should allow an authorized user to delete an order`, done => {
							User.findOne({ where: { email: user2Payload.email } }).then(user => {
								const { id, name, email } = user;
								const token = jwt.sign(
									{
										user: { id, name, email },
									},
									secret,
									{
										expiresIn: 86400,
									},
								);
								chai
									.request(app)
									.put(`${URL_PREFIX}/orders/${order.id}`)
									.set('Authorization', `Bearer ${token}`)
									.send({
										action: 'delete',
									})
									.then(res => {
										res.should.have.status(200);
                    res.body.should.be.a('object');
										res.body.should.have.property('status').eql('success');
										done();
									})
									.catch(err => console.log('PUT /orders/:orderId', err.message));
							});
						});
					});
			})
			.catch(err => console.log(err.message));
	});

	describe('Get Order Items (User)', () => {
		Caterer.create(caterer4Payload)
			.then(caterer => {
        return Meal.create({
          name: 'Amala with gbegiri',
          price: 400,
          quantity: 3,
          imageUrl: 'fk.png',
          catererId: caterer.id,
				});
			})
			.then(meal => {
				User.create(user3Payload)
					.then(user => {
						return Order.create({ mealId: meal.id, quantity: 5, userId: user.id });
					})
					.then(() => {
						it(`it should not allow an unauthorized user to fetch all orders`, done => {
							chai
								.request(app)
								.get(`${URL_PREFIX}/orders/user`)
								.then(res => {
									res.should.have.status(401);
									res.body.should.have.property('status').eql('error');
									done();
								})
								.catch(err => console.log('GET /orders/user', err.message));
						});
						it(`it should allow an authorized user to fetch orders`, done => {
							User.findOne({ where: { email: user3Payload.email } }).then(user => {
								const { id, name, email } = user;
								const token = jwt.sign(
									{
										user: { id, name, email },
									},
									secret,
									{
										expiresIn: 86400,
									},
								);
								chai
									.request(app)
									.get(`${URL_PREFIX}/orders/user`)
									.set('Authorization', `Bearer ${token}`)
									.then(res => {
										res.should.have.status(200);
                    res.body.should.be.a('object');
										res.body.should.have.property('status').eql('Success');
										done();
									})
									.catch(err => console.log('GET /orders/user', err.message));
							});
						});
					});
			});
	});

	describe('Checkout Orders (User)', () => {
		Caterer.create(caterer5Payload)
			.then(caterer => {
        return Meal.create({
          name: 'Amala with gbegiri',
          price: 400,
          quantity: 3,
          imageUrl: 'fk.png',
          catererId: caterer.id,
				});
			})
			.then(meal => {
				const newMenu = [];
				newMenu.push({
					id: meal.id,
					name: meal.name,
					price: meal.price,
					quantity: meal.quantity,
					imageUrl: meal.imageUrl,
					catererId: meal.catererId,
				});
				return Menu.create({ meals: JSON.stringify(newMenu), catererId: meal.catererId });
			})
			.then(menu => {
				User.create(user4Payload)
					.then(user => {
						const meals = JSON.parse(menu.meals);
						return Order.create({ mealId: meals[0].id, quantity: 1, userId: user.id });
					})
					.then(() => {
						it(`POST ${URL_PREFIX}/orders/checkout - Order Checkout (Unauthorized)`, done => {
							chai
								.request(app)
								.post(`${URL_PREFIX}/orders/checkout`)
								.send({
									billingAddress: 'desert',
								})
								.then(res => {
									res.should.have.status(401);
									res.body.should.have.property('status').eql('error');
									done();
								})
								.catch(err => console.log('POST /orders/checkout', err.message));
						});
						it(`it should validate user before the ability to checkout`, done => {
							User.findOne({ where: { email: user4Payload.email } }).then(user => {
								const { id, name, email } = user;
								const token = jwt.sign(
									{
										user: { id, name, email },
									},
									secret,
									{
										expiresIn: 86400,
									},
								);
								chai
									.request(app)
									.post(`${URL_PREFIX}/orders/checkout`)
									.set('Authorization', `Bearer ${token}`)
									.send({
										billingAddress: 18828,
									})
									.then(res => {
										res.should.have.status(400);
										res.body.should.have.property('status').eql('error');
										done();
									})
									.catch(err => console.log('POST /orders/checkout', err.message));
							});
						});
						it(`users should not be able to checkout without ordered items`, done => {
							User.create(user5Payload).then(user => {
								const { id, name, email } = user;
								const token = jwt.sign(
									{
										user: { id, name, email },
									},
									secret,
									{
										expiresIn: 86400,
									},
								);
								chai
									.request(app)
									.post(`${URL_PREFIX}/orders/checkout`)
									.set('Authorization', `Bearer ${token}`)
									.send({
										billingAddress: 'somewhere',
									})
									.then(res => {
										res.should.have.status(500);
										res.body.should.have.property('status').eql('error');
										done();
									})
									.catch(err => console.log('POST /orders/checkout', err.message));
							});
						});
						it(`it should allow user to checkout`, done => {
							User.findOne({ where: { email: user4Payload.email } }).then(user => {
								const { id, name, email } = user;
								const token = jwt.sign(
									{
										user: { id, name, email },
									},
									secret,
									{
										expiresIn: 86400,
									},
								);
								chai
									.request(app)
									.post(`${URL_PREFIX}/orders/checkout`)
									.set('Authorization', `Bearer ${token}`)
									.send({
										billingAddress: 'somewhere',
									})
									.then(res => {
										res.should.have.status(201);
										res.body.should.have.property('status').eql('success');
										done();
									})
									.catch(err => console.log('POST /orders/checkout', err.message));
							});
						});
					});
			})
			.catch(err => console.log(err.message));
	});
});

after(done => {
	User.destroy({ where: { email: userPayload.email } })
		.then(async () => {
			await Caterer.destroy({ where: { email: catererPayload.email } });
			await Caterer.destroy({ where: { email: caterer2Payload.email } });
			await Caterer.destroy({ where: { email: caterer3Payload.email } });
			await Caterer.destroy({ where: { email: caterer4Payload.email } });
			await Caterer.destroy({ where: { email: caterer5Payload.email } });
			await User.destroy({ where: { email: user2Payload.email } });
			await User.destroy({ where: { email: user3Payload.email } });
			await User.destroy({ where: { email: user4Payload.email } });
			return User.destroy({ where: { email: user5Payload.email } });
		})
		.then(() => {
			done();
		});
});
