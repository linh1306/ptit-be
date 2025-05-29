import { Prisma } from '@prisma/client';
import select from './select.config';
type Tmp = typeof select.findByPost;

export type TFin = Prisma.CommentsGetPayload<Tmp>;
