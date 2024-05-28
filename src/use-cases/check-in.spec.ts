import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryUsersRepository } from "@/repositores/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { CheckInsRespository } from "@/repositores/check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositores/in-memory/in-memory-checkins-repository";

let checkInsRepository: CheckInsRespository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("should be able to check in", async () => {

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
