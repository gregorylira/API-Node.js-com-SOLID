import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositores/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "any_name",
      email: "any_email@any.com",
      password: "any_password",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should register a new user", async () => {
    const { user } = await sut.execute({
      name: "any_name",
      email: "any_email@any.com",
      password: "any_password",
    });

    const isPasswordCorrectlyHashed = await compare(
      "any_password",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "any_email@any.com";

    await sut.execute({
      name: "any_name",
      email,
      password: "any_password",
    });

    await expect(() =>
      sut.execute({
        name: "any_name",
        email,
        password: "any_password",
      })
    ).rejects.toThrowError(new UserAlreadyExistsError());
  });
});
