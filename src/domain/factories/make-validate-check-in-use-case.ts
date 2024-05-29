import { PrismaCheckInsRepository } from '@/repositores/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../cases/validate-check-in/validate-check-in'

export function makeValidateCheckinUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
