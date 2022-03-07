import prisma from '@lib/prisma';

import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

interface ProductPostBody {
	name: string;
	description: string;
	category: string;
	totalBuy?: number;
}

const validatePost = async function (body: any) {
	if ('name' in body && 'description' in body && 'category' in body) {
		if (
			typeof body.name === 'string' &&
			typeof body.description === 'string' &&
			typeof body.category === 'string'
		) {
			// validates totalBuy seperatly since it is optional
			// if not present default value of 0 is given
			if ('totalBuy' in body && typeof body.totalBuy !== 'number') {
				throw Error('Field types are not correct');
			}
			return body as ProductPostBody;
		}
		throw Error('Field types are not correct');
	}
	throw Error('Missing body fields');
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
		}
		// session is required for all other methods
		const session = getSession({ req });

		if (req.method === 'POST') {
			const body = await validatePost(req.body);
			// FIXME This will not work without session data
			const product = createPost(body, session.data.userId);

			// TODO redirect to newly created product
			res.redirect(301, '');
			return;
		} else if (req.method === 'DELETE') {
		}
	} catch (error) {
		res.status(404).json({ error: error as string });
		return;
	}
	res.json({ message: 'hello' });
}
