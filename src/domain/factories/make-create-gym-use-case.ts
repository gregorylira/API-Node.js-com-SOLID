import { CreateGymUseCase } from '../cases/create-gym'
import { PrismaGymsRepository } from '@/repositores/prisma/prisma-gyms-repository'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
