import request from 'supertest';
import app from '../config/app';

describe('BodyParser Middleware', () => {
  test('Should parse body as json', async () => {
    const sendData = {
      name: 'anyName',
    };
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app).post('/test_body_parser').send(sendData).expect(sendData);
  });
});
