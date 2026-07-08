import { InMemoryUserRepository } from "@/repositories/in-memory-user-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticaUseCase } from "./authenticate.js";
import { InvalidCredentialError } from "./errors/invalid-credential-error.js";
import { hash } from "bcryptjs";

let userRepository: InMemoryUserRepository;
let sut: AuthenticaUseCase;

describe("Authenticate test", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticaUseCase(userRepository);
  });

  it("should be able validate in app", async () => {
    await userRepository.create({
      name: "Cauê",
      email: "cauealvesb4@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "cauealvesb4@gmail.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able validate email exist", async () => {
    await expect(() =>
      sut.execute({ email: "cauealvesb4@gmail.com", password: "123456" }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("should be able validate password", async () => {
    await userRepository.create({
      name: "Cauê",
      email: "cauealvesb4@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({ email: "cauealvesb4@gmail.com", password: "123123" }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
