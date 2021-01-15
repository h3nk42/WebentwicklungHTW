// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../Server');
const mongoose = require ('mongoose')

const {dropDb} = require('../utils/dropDb')

// Configure chai
chai.use(chaiHttp);
chai.should();
let token;
let planId;


describe(" createUser / login : ", () => {

    const longString = "a".repeat(1000);

    before(
        function (done) {
            dropDb.then(() => done())
        })

    describe("create User 1", () => {
        it("(HAPPY PATH) should create a user, login and return userName with whoAmI", (done) => {
            chai.request(app)
                .post('/api/user/createUser',)
                .send({userName: 'paraiso', password: 'iloveandroid'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    chai.request(app)
                    done();
                })
        })
    });
});

    describe("create User 2", () => {
        it("(HAPPY PATH) should create a user, login and return userName with whoAmI", (done) => {
            chai.request(app)
                .post('/api/user/createUser',)
                .send({userName: 'henk', password: 'iloveandroid'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    chai.request(app)
                        .post('/api/auth/login',)
                        .send({userName: 'henk', password: 'iloveandroid'})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            token = res.body.token;
                            chai.request(app)
                                .get('/api/auth/whoAmI')
                                .auth(token, {type: 'bearer'})
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    chai.expect(res.body.data.userName).equal('henk');
                                    done();
                                });
                        });
                });
        });
    });

describe("createPlan", () => {
    it("(HAPPY PATH) should create a plan and then find it in DB", (done) => {
        chai.request(app)
            .post('/api/plan/create')
            .auth(token, {type: 'bearer'})
            .send({name: 'haushalt1'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                chai.request(app)
                    .get('/api/plan/showOne')
                    .auth(token, {type: 'bearer'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        chai.expect(res.body.data.name).to.equal('haushalt1')
                        done();
                    });
            });
    });
});

describe("add user 1 to Plan", () => {
    it("(HAPPY PATH) should add a user to plan", (done) => {
        chai.request(app)
            .post('/api/plan/addUser',)
            .auth(token, { type: 'bearer' })
            .send({ userName: 'paraiso' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                chai.request(app)
                chai.request(app)
                    .get('/api/plan/showOne')
                    .auth(token, { type: 'bearer' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        chai.expect(res.body.data.users[1].userName).to.equal('paraiso')
                        planId = res.body.data._id;
                        done();
                    })
            })
    });
});
