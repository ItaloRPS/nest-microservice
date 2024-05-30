import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';

export type PrismaClientError = PrismaClientKnownRequestError & {
  meta?: { target: string };
};