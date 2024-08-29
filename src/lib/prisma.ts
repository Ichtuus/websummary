import { PrismaClient } from '@prisma/client';
import { UserService } from '$lib/services/userService/index';

export const prisma = new PrismaClient();
export const userService = new UserService();
