import { CheckIn, Prisma} from "@prisma/client";
import { CheckInsRespository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRespository {
  public checkins: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin: CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.checkins.push(checkin);

    return checkin;
  }
}
