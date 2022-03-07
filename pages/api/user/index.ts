import prisma from '@lib/prisma';

import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

interface UserDeleteBody {
	id: string;
}

const validateDeleteBody = function (body: any) {
	if ('id' in body) {
		if (typeof body.id === 'string') {
			return body as UserDeleteBody;
		}
		throw Error('Field types are not correct');
	}
	throw Error('Missing body fields');
};

const deleteUser = async function ({ id }: UserDeleteBody) {
	await prisma.user.delete({
		where: {
			id,
		},
	});
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const session = await getSession({ req });
		if (session) {
			if (req.method === 'DELETE') {
				const body = validateDeleteBody(req.body);
				// FIXME userId must contain its correct type
				if (body.id !== session.data.userId) {
					// Makes sure user account id the same as session userId
					// Could be spoofed and delete another user account
					res
						.status(406)
						.json({ error: 'Cannot delete another users account' });
					return;
				}

				await deleteUser(req.body);
			}
		}
		res.status(401).json({ error: 'Not Authenticated' });
	} catch (error) {
		res.status(501).json({ error: error as string });
	}
}
