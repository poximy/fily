///<reference path="../global.d.ts"/>
import prisma from '../app/lib/prisma';
import faker from '@faker-js/faker';

// FIXME
// Temporal type
// Product-Data-Object-Tranposrt (?)
// type productDOT = {
// 	name: string;
// 	category: string;
// 	description: string;
// 	currentBid: number;
// 	totalBuy?: number;
// 	User: {
// 		connect: {
// 			id: string;
// 		};
// 	};
// };

// FIXME
// Temporal type
// User-Data-Object-Tranposrt (?)
// type userDOT = {
// 	email: string;
// 	nickname: string;
// 	password: string;
// 	money: number;
// 	phone: string;
// 	reputation: number;
// 	verified: boolean;
// };

async function clear(): Promise<void> {
	await prisma.user.deleteMany({});
	await prisma.product.deleteMany({});
}

async function seedProducts(id: string, n = 5): Promise<void> {
	const products = Array.from({ length: n }, () => {
		return {
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
		};
	});

	await Promise.all(
		products.map(async user => {
			prisma.product.create({
				data: user,
			});
		}),
	);
}

async function seedUsers(n = 5): Promise<void> {
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
				// FIXME with get more info
				serviceId: 'VALUE BY DEFAULT',
				// FIXME with get more info
				seviceType: 'VALUE BY DEFAULT',
			},
		});
		await seedProducts(user.id);
	}
}

async function main(): Promise<void> {
	await clear();
	await seedUsers();
}

export { main };
