import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { bakeryValidationSchema } from 'validationSchema/bakeries';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBakeries();
    case 'POST':
      return createBakery();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBakeries() {
    const data = await prisma.bakery
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'bakery'));
    return res.status(200).json(data);
  }

  async function createBakery() {
    await bakeryValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.product?.length > 0) {
      const create_product = body.product;
      body.product = {
        create: create_product,
      };
    } else {
      delete body.product;
    }
    const data = await prisma.bakery.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
