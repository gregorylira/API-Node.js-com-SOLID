import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRespository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRespository {
  public checkins: CheckIn[] = []

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkins.findIndex((c) => c.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.checkins[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findById(id: string) {
    return this.checkins.find((checkIn) => checkIn.id === id) ?? null
  }

  async countByUserId(userId: string) {
    return this.checkins.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findManybyUserId(userId: string, page: number) {
    return this.checkins
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkinOnSameDate = this.checkins.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkinOnSameDate) {
      return null
    }

    return checkinOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin: CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.checkins.push(checkin)

    return checkin
  }
}
