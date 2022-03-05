import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient;

	module globalThis {
		var prisma: PrismaClient;
	}
}
