import fastify from 'fastify';
import * as path from "path"
import fastifyNow from 'fastify-now';
import prismaPlugin from './plugins/prisma';
import * as dotenv from "dotenv"

(async () => {

  dotenv.config();

  const server = fastify({
    logger: process.env.NODE_ENV === "development" ? {
      level: "info"
    } : false
  });

  await server.register(fastifyNow, {
    routesFolder: path.join(__dirname, './routes'),
    pathPrefix: '/api'
  });

  await server.register(prismaPlugin);

  await server.listen(process.env.PORT || 3000, (error) => {
    if (error) throw error
  })

})();