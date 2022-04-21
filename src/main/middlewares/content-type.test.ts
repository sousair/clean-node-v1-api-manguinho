import request from 'supertest';
import app from '../config/app';

describe('ContentType Middleware', () => {
  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('');
    });
    await request(app)
      .get('/test_content_type')
      .expect('Content-Type', /json/);
  });

  test('Should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml');
      res.send('');
    });
    await request(app)
      .get('/test_content_type_xml')
      .expect('Content-Type', /xml/);
  });
});