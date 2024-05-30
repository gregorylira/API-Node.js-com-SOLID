import { SearchGymsUseCase } from '../cases/search-gyms/search-gyms'
import { PrismaGymsRepository } from '@/repositores/prisma/prisma-gyms-repository'

export function makeSeachGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
