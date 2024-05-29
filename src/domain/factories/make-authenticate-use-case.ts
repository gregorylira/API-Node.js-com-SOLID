import { PrismaUsersRepository } from '@/repositores/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../cases/authenticate/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
