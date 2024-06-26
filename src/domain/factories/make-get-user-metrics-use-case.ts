import { GetUserMetricsUseCase } from '../cases/get-user-metrics/get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositores/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
