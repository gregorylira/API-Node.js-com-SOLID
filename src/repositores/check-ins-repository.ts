import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRespository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManybyUserId(userId: string, page: number): Promise<CheckIn[]>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
