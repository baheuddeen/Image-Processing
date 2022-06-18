import app from '../../../src/app.js';
import request from 'supertest';

describe('GET /', function () {
  it('the response should be 200 ok for the index page', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) console.log(err);
        done();
      });
  });
});
