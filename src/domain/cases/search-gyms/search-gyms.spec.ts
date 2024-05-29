import { InMemoryGymsRepository } from '@/repositores/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'
import { beforeEach, describe, expect, it } from 'vitest'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: 'null',
      description: 'null',
    })
    await gymsRepository.create({
      title: 'TypeScript Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: 'null',
      description: 'null',
    })

    const { gyms } = await sut.execute({ query: 'JavaScript', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: 'null',
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: 'null',
      })
    }

    const { gyms } = await sut.execute({ query: 'JavaScript', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
