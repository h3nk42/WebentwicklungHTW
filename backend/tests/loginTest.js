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
    describe("User", () => {
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
})
