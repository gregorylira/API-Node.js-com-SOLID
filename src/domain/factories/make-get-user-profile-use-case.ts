import { PrismaUsersRepository } from '@/repositores/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../cases/get-user-profile/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
