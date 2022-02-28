import { NextApiRequest, NextApiResponse } from 'next';
import { data } from './_data';

export default function productByIdEndpoint(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { id } = req.query;
	const product = data.find(p => p.id === parseInt(id as string));

	if (!product) {
		res.statusCode = 404;
		res.json({
			message: 'Product not found',
		});
		return;
	}

	res.statusCode = 200;
	res.json(product);
}
