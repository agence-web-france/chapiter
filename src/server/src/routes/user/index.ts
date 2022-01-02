import { NowRequestHandler } from 'fastify-now';

export const POST: NowRequestHandler<{ Body: { name: string } }> = async function (req) {
  const { name } = req.body

  const user = await this.prisma.user.create({
    data: {
      name
    }
  })

  return user
}

POST.opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
      required: ['name'],
    },
  },
};