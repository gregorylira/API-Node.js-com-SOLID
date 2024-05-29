import { FetchUserCheckInsHistoryUseCase } from '../fetch-member-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositores/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
