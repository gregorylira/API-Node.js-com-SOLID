import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const { email } = data
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithEmail) {
      throw new Error('Email already in use')
    }

    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
