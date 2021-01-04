import request from 'supertest'

import app from '../config/app'

describe.only('Body Parser', () => {
  it('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Elisson' })
      .expect({ name: 'Elisson' })
  })
})
