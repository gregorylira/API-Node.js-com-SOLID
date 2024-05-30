import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSeachGymsUseCase } from '@/domain/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsQuerySchema.parse(request.body)

  const searchGymsuseCase = makeSeachGymsUseCase()
  const { gyms } = await searchGymsuseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
