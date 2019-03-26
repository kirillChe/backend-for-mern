import request from 'supertest';
import httpStatus from 'http-status';
import {expect} from 'chai';
import sinon from 'sinon';
import app from '../../../index';
import {clearDatabase} from '../test-helpers/clearDb';
import User from '../../models/user';
import Message from '../../models/message';

require('sinon-mongoose');
// require('sinon-as-promised');

describe('## Messages API Tests', () => {
    let sandbox, user, message;

    before(done => {
        User.create({
            username: 'testuser',
            password: 'testuser'
        }).then((u) => {
            user = u;
            done();
        })
    });

    // beforeEach((done) => {
    //     clearDatabase(() => {
    //         sandbox = sinon.createSandbox();
    //         done();
    //     });
    // });
    //
    // afterEach((done) => {
    //     sandbox.restore();
    //     done();
    // });

    after(done => {
        clearDatabase(done);
    });

    describe('### POST /messages', () => {
        it('should return the created message successfully', (done) => {
            request(app)
                .post('/api/messages')
                .send({
                    owner: user._id,
                    title: 'this is a test title',
                    text: 'this is a test text'
                })
                .expect('Content-type', /json/)
                .expect(httpStatus.OK)
                .end(function (err, res) {
                    if (err) {
                        console.dir(res.text, {colors: true, depth: 3});
                        return done(err);
                    }
                    expect(res.body.owner).to.equal(user._id.toString());
                    expect(res.body.title).to.equal('this is a test title');
                    expect(res.body._id).to.exist;
                    message = res.body;
                    done();
                });
        });

        // it('should return Internal Server Error when mongoose fails to save message', (done) => {
        //     const createStub = sandbox.stub(Message, 'create');
        //     createStub.rejects({});
        //     request(app)
        //         .post('/api/messages')
        //         .send({
        //             owner: user._id,
        //             title: 'this is a test title',
        //             text: 'this is a test text'
        //         })
        //         .expect(httpStatus.INTERNAL_SERVER_ERROR)
        //         .then(() => done())
        //         .catch(err => {
        //
        //             done(err)
        //         });
        // });

        it('should return Bad Request when missing owner', (done) => {
            request(app)
                .post('/api/messages')
                .send({
                    title: 'this is a test title'
                })
                .expect(httpStatus.BAD_REQUEST)
                .then(() => done())
                .catch(done);
        });
    });

    describe('### GET /messages', () => {
        it('should return the list of messages successfully', (done) => {
            request(app)
                .get('/api/messages')
                .send()
                .expect(httpStatus.OK)
                .then(res => {
                    done();
                })
                .catch(done);
        });
    });

    describe('### GET /messages/:messageId', () => {
        it('should return the specific message successfully', (done) => {
            request(app)
                .get(`/api/messages/${message._id}`)
                .send()
                .expect(httpStatus.OK)
                .then(res => {
                    done();
                })
                .catch(done);
        });
    });

    describe('### PUT /messages/:messageId', () => {

    });

    describe('### DELETE /messages/:messageId', () => {
        it('should delete the specific message successfully', (done) => {
            request(app)
                .del(`/api/messages/${message._id}`)
                .send()
                .expect(httpStatus.NO_CONTENT)
                .then(res => {
                    console.log('messages.test.js :45', res.body);
                    done();
                })
                .catch(err => {
                    console.log('messages.test.js :49', err);
                    done(err)
                });
        });
    });

});