import prisma from '@lib/prisma';

import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

interface ProductPostBody {
	name: string;
	description: string;
	category: string;
	totalBuy?: number;
}

const hasValidFields = (body: any): boolean => {
	return 'name' in body && 'description' in body && 'category' in body;
}

// validates totalBuy seperatly since it is optional
// if not present default value of 0 is given
const hasTotalBuyValid = (body: any): boolean => {
	return (
		typeof body.totalBuy === 'undefined' ||
			typeof body.totalBuy === 'number');
}

const hasValidTypesByFields = (body: any): boolean => {
	return (
		typeof body.name === 'string' &&
			typeof body.description === 'string' &&
			typeof body.category === 'string' &&
			hasTotalBuyValid(body)
	);
}

const validatePost = function (body: any): ProductPostBody {
	if (!hasValidFields(body)){
		throw Error('Missing body fields');
	}

	if (!hasValidTypesByFields(body)) {
		throw Error('Field types are not correct');
	}

	return body as ProductPostBody;
};

const createPost = async function (product: ProductPostBody, userId: string) {
	return await prisma.product.create({
		data: {
			userId,
			...product,
		},
	});
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		if (req.method === 'GET') {
			console.error("No implemented GET");
			return;
		}
		// session is required for all other methods
		const session = await getSession({ req });

		if (req.method === 'POST') {
			const body = validatePost(req.body);

			// FIXME This will not work without session data
			const product = createPost(body,session.data.userId);

			// TODO redirect to newly created product
			res.redirect(301, '');
			return;
		}

		if (req.method === 'DELETE') {
			console.error("No implemented DELETE");
			return;
		}
	} catch (error) {
		res.status(403).json({ error: error as string });
		return;
	}
	res.json({ message: 'hello' });
}
