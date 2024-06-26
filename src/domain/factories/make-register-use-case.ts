import { PrismaUsersRepository } from '@/repositores/prisma/prisma-users-repository'
import { RegisterUseCase } from '../cases/register/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
