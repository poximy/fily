import faker from '@faker-js/faker';

type Product = {
	category: string,
	name: string,
	description: string,
	currentBid: number,
	totalBuy?: number,
};

type User = {
	email: string,
	nickname: string,
	password: string,
	money: number,
	phone: string,
	reputation: number,
	verified: boolean,
	products: Array<Product>,
};



const fakerPrice = faker.commerce.price;
const generatePrice = (...args: Parameters<typeof fakerPrice>) => {
	return parseFloat(fakerPrice(...args));
}
// Array.from({length: numberOfThigs}, () => generator(...argsOfGenerator));

function generateProduct(): Product{
	return {
		category: faker.commerce.department(),
		name: faker.commerce.productName(),
		description: faker.lorem.paragraph(),
		currentBid: generatePrice(),
		totalBuy: faker.random.arrayElement([
			undefined,
			generatePrice(900),
		])};
}

function generateUser(numberOfProducs: number): User{
	return {
		email: faker.internet.email(),
		nickname: faker.internet.userName(),
		password: faker.internet.password(),
		money: generatePrice(0, 10000),
		phone: faker.phone.phoneNumber(),
		reputation: parseInt(faker.commerce.price(0, 100)),
		verified: faker.random.arrayElement([true, false]),
		products: generateProducts(numberOfProducs),
	}
}
// function generateProductWithUserId(id: string){
// 	return {
// 		...generateProduct(),
// 		User: { connect: { id, }, } };
// };

function generateProducts(numberOfProducts = 5): Array<Product> {
	return Array.from(
		{length: numberOfProducts},
		() => generateProduct());
}

function generateUsers(numberOfUsers: number,
					   numberOfProducsByUser: number): Array<User>{
	return Array.from(
		{length: numberOfUsers},
		() => generateUser(numberOfProducsByUser));
}

export { generateUsers };
