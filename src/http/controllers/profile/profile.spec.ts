import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/user').send({
      name: 'any_name',
      email: 'any@any.com',
      password: 'any_password',
    })

    const authResponse = await request(app.server).post('/session').send({
      email: 'any@any.com',
      password: 'any_password',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'any@any.com',
      }),
    )
  })
})
