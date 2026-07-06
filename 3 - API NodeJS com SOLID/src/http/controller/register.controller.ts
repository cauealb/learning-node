import { EmailAlreadyExistsError } from "@/use-case/errors/email-already-exists-error.js";
import { makeRegisterUseCase } from "@/use-case/factories/make-register-use-case.js";
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
    const registerUserCase = makeRegisterUseCase()

    await registerUserCase.execute({ name, email, password });
  } catch (err) {

    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err
  }

  return reply.status(201).send();
}




