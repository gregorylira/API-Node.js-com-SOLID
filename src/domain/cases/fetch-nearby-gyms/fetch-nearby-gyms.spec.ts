import { InMemoryGymsRepository } from '@/repositores/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { Decimal } from '@prisma/client/runtime/library'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: 'null',
      description: 'null',
    })
    await gymsRepository.create({
      title: 'Near 2 Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: 'null',
      description: 'null',
    })
    await gymsRepository.create({
      title: 'Far Gym',
      latitude: new Decimal(-27.0610928),
      longitude: new Decimal(-49.5229501),
      phone: 'null',
      description: 'null',
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' }),
      expect.objectContaining({ title: 'Near 2 Gym' }),
    ])
  })
})
