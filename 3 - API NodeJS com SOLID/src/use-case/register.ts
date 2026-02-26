import { prisma } from "@/lib/prisma.js";
import { PrismaUserRepository } from "@/repositories/prisma-user-repository.js";
import type { UserRepository } from "@/repositories/prisma/user-repository.js";
import { hash } from "bcryptjs";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error.js";

const prismaUserRepository = new PrismaUserRepository();

export interface RegisterUseCaseInput {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: RegisterUseCaseInput) {
    const password_hash = await hash(password, 6);

    const findEmailWithSame = await this.userRepository.findByEmail(email);

    if (findEmailWithSame) {
      throw new EmailAlreadyExistsError();
    }

    this.userRepository.create({ name, email, password_hash });
  }
}
