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


describe(" TESTS : ", () => {
    const longString = "a".repeat(1000);
    before(
        function (done) {
            dropDb.then(() => done())
        })
    describe("create User", () => {
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
        it("(UNHAPPY PATH) should not create a user (userName.length() > 15, password.length() > 20 )", (done) => {
            chai.request(app)
                .post('/api/user/createUser',)
                .send({userName: longString, password: longString})
                .end((err, res) => {
                    res.should.have.status(418);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("(UNHAPPY PATH) should not create a user (empty userName)", (done) => {
            chai.request(app)
                .post('/api/user/createUser',)
                .send({userName: '', password: 'iloveandroid'})
                .end((err, res) => {
                    res.should.have.status(418);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("(UNHAPPY PATH) should not create a user (empty password)", (done) => {
            chai.request(app)
                .post('/api/user/createUser',)
                .send({userName: 'dontCreateMe', password: ''})
                .end((err, res) => {
                    res.should.have.status(418);
                    res.body.should.be.a('object');
                    chai.expect(res.body.customMessage).equal('INVALID_INPUT')
                    done();
                });
        });
        it("(UNHAPPY PATH) should not create a user (username taken, case insensitive)", (done) => {
            chai.request(app)
                .post('/api/user/createUser',)
                .send({userName: 'HEnk', password: 'sneek'})
                .end((err, res) => {
                    res.should.have.status(418);
                    res.body.should.be.a('object');
                    chai.expect(res.body.customMessage).equal('USERNAME_TAKEN')
                    done();
                });
        });
    })
    describe("delete User", () => {
        it("(HAPPY PATH) should delete a user", (done) => {
            chai.request(app)
                .post('/api/user/createUser',)
                .send({userName: 'deleteMe', password: 'sneek'})
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
                                .delete('/api/user/delUser')
                                .auth(token, {type: 'bearer'})
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    chai.request(app)
                                        .get('/api/auth/whoAmI')
                                        .auth(token, {type: 'bearer'})
                                        .end((err, res) => {
                                            res.should.have.status(401);
                                            done();
                                        })
                                });
                        });
                })
        });
    })

    describe(" CREATE Plan", () => {
        it("(UNHAPPY PATH) should not create a plan (empty planName)", (done) => {
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
                                .post('/api/plan/create')
                                .auth(token, {type: 'bearer'})
                                .send({name: ''})
                                .end((err, res) => {
                                    res.should.have.status(418);
                                    res.body.should.be.a('object');
                                    chai.expect(res.body.customMessage).equal("INVALID_INPUT")
                                    done();
                                });
                        });
                });
        });

        it("(UNHAPPY PATH) should not create a plan ( name.length() > 15 )", (done) => {
            chai.request(app)
                .post('/api/plan/create')
                .auth(token, {type: 'bearer'})
                .send({name: 'Das ist ein sehr langer Haushaltsplan'})
                .end((err, res) => {
                    res.should.have.status(418);
                    res.body.should.be.a('object');
                    chai.expect(res.body.customMessage).equal("INVALID_INPUT")
                    done();
                });
        });

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

        it("(UNHAPPY PATH) should not create a plan (1 plan per user)", (done) => {
            chai.request(app)
                .post('/api/plan/create')
                .auth(token, {type: 'bearer'})
                .send({name: 'haushalt1'})
                .end((err, res) => {
                    res.should.have.status(418);
                    res.body.should.be.a('object');
                    chai.expect(res.body.customMessage).equal("ONLY_ONE_PLAN_PER_USER")
                    done();
                });
        });

        it("(UNHAPPY PATH) should not create a plan (not logged in)", (done) => {
            chai.request(app)
                .post('/api/plan/create')
                .send({name: 'haushalt1'})
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });
    })

    describe(" DELETE Plan", () => {
        it("(HAPPY PATH) should delete plan, and update users", (done) => {
            chai.request(app)
                .delete('/api/plan/delete')
                .auth(token, {type: 'bearer'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    chai.request(app)
                        .get('/api/auth/whoAmI')
                        .auth(token, {type: 'bearer'})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            chai.expect(res.body.data.plan).equal(null);
                            chai.expect(res.body.data.userName).equal('henk');
                            done();
                        });
                })
        })
    })

    describe("create User 2", () => {
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

    describe("add user to Plan", () => {
        it("(HAPPY PATH) should add a user to plan", (done) => {
            chai.request(app)
                .post('/api/plan/create')
                .auth(token, {type: 'bearer'})
                .send({name: 'haushalt1'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    chai.request(app)
                        .post('/api/plan/addUser',)
                        .auth(token, {type: 'bearer'})
                        .send({userName: 'paraiso'})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            chai.request(app)
                            chai.request(app)
                                .get('/api/plan/showOne')
                                .auth(token, {type: 'bearer'})
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    chai.expect(res.body.data.users[1].userName).to.equal('paraiso')
                                    planId = res.body.data._id;
                                    done();
                                })
                        });
                })
        });
    });
    describe("remove User from Plan", () => {
        it("(HAPPY PATH) should add a user to plan", (done) => {
            chai.request(app)
                .post('/api/plan/removeUser',)
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
                            chai.expect(res.body.data.users.length).to.equal(1)
                            planId = res.body.data._id;
                            done();
                        })
                })
        });
    });
})
