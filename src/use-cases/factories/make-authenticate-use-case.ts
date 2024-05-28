import { PrismaUsersRepository } from "@/repositores/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeRegisterUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}