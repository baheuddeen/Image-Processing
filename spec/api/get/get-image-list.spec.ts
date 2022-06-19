import app from '../../../src/app.js';
import request from 'supertest';

describe('GET /imagesList', function (): void {
  it('respond with Array of strings that contains "fjord.jpg"', function (done) {
    request(app)
      .get('/api/get/imagesList')
      .expect(200)
      .end(function (err, res) {
        expect(res.body.imagesList).toContain('fjord.jpg');
        if (err) console.log(err);
        done();
      });
  });
});
