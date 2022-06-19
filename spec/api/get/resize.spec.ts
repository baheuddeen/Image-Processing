import app from '../../../src/app.js';
import request from 'supertest';

describe('GET /resize', function (): void {
  it('response status is 200 /api/get/resize/fjord_500_500.jpg As "fjord.jpg" is exist', function (done) {
    request(app)
      .get('/api/get/resize/fjord_500_500.jpg')
      .expect(200)
      .end(function (err, res) {
        if (err) console.log(err);
        done();
      });
  });

  it('response should be 400 for /api/get/resize/image-not-exist_500_500.png as "image-not-exist.png" is not exist', function (done): void {
    request(app)
      .get('/api/get/resize/image-not-exist_500_500.png')
      .expect(400)
      .end(function (err, res) {
        if (err) console.log(err);
        done();
      });
  });
});
