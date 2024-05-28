import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { CheckIn} from "@prisma/client";
import { CheckInsRespository } from "@/repositores/check-ins-repository";

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase{
    constructor(private checkInsRepository: CheckInsRespository) {}

    async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkIn
        }
    }
}