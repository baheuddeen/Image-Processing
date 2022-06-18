import app from '../../../src/app.js';
import request from 'supertest';

describe('POST /uploadImage', function () {
  it('response status is 200', function (done) {
    request(app)
      .post('/api/post/uploadImage')
      .expect(200)
      .end(function (err, res) {
        if (err) console.log(err);
        done();
      });
  });
});
