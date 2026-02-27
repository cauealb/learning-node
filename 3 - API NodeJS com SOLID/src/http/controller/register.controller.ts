import { PrismaUserRepository } from "@/repositories/prisma-user-repository.js";
import { EmailAlreadyExistsError } from "@/use-case/errors/Email-already-exists-error.js";
import { RegisterUseCase } from "@/use-case/register.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(7),
  });

  const { name, email, password } = requestBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUserRepository();
    const registerUserCase = new RegisterUseCase(userRepository);

    await registerUserCase.execute({ name, email, password });
  } catch (err) {

    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err
  }

  return reply.status(201).send();
}
