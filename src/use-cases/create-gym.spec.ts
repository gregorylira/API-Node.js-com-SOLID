import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositores/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'any_title',
      description: 'any_description',
      phone: 'any_phone',
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
