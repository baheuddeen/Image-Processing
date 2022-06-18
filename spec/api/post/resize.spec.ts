import app from '../../../src/app.js';
import request from 'supertest';

describe('POST /resize', function () {
  it('response status is 200 /api/post/resize/fjord_500_500.jpg As "fjord.jpg" is exist', function (done) {
    request(app)
      .post('/api/post/resize/fjord_500_500.jpg')
      .expect(200)
      .end(function (err, res) {
        if (err) console.log(err);
        done();
      });
  });

  it('response should be 400 for /api/post/resize/image-not-exist_500_500.png as "image-not-exist.png" is not exist', function (done) {
    request(app)
      .post('/api/post/resize/image-not-exist_500_500.png')
      .expect(400)
      .end(function (err, res) {
        if (err) console.log(err);
        done();
      });
  });
});
