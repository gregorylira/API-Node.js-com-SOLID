import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/user').send({
      name: 'any_name',
      email: 'any@any.com',
      password: 'any_password',
    })

    const authResponse = await request(app.server).post('/session').send({
      email: 'any@any.com',
      password: 'any_password',
    })

    const cookies = authResponse.get('Set-Cookie')

    if (!cookies) {
      throw new Error('No cookies')
    }

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
