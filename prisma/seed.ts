///<reference path="../global.d.ts"/>
import prisma from '../app/lib/prisma';
import faker from '@faker-js/faker';

async function clear() {
	await prisma.user.deleteMany({});
	await prisma.product.deleteMany({});
}

async function seedProducts(id: string, n: number = 5) {
	for (let i = 0; i < n; i++) {
		await prisma.product.create({
			data: {
				name: faker.commerce.productName(),
				category: faker.commerce.department(),
				description: faker.lorem.paragraph(),
				currentBid: parseFloat(faker.commerce.price()),
				totalBuy: faker.random.arrayElement([
					undefined,
					parseFloat(faker.commerce.price(900)),
				]),
				User: {
					connect: {
						id,
					},
				},
			},
		});
	}
}

async function seedUsers(n: number = 5) {
	for (let i = 0; i < n; i++) {
		const user = await prisma.user.create({
			data: {
				email: faker.internet.email(),
				nickname: faker.internet.userName(),
				password: faker.internet.password(),
				money: parseFloat(faker.commerce.price(0, 10000)),
				phone: faker.phone.phoneNumber(),
				reputation: parseInt(faker.commerce.price(0, 100)),
				verified: faker.random.arrayElement([true, false]),
			},
		});
		await seedProducts(user.id);
	}
}

async function main() {
	await clear();
	await seedUsers();
}

main();
