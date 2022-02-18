import MainLayout from '@app/layouts/Main';
import { IProduct } from '@app/typings/product';
import { sanityRoute } from '@app/utils/route';
import { Box, Flex, Text } from '@chakra-ui/react';
import Icon from '@components/Icon';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';

interface ProductScreenProps {
	product: IProduct | null;
}

const ProductScreen: NextPage<ProductScreenProps> = ({ product }) => {
	if (!product) {
		return (
			<MainLayout>
				<Flex justify='center' align='center' pt={10}>
					<Text fontSize='3xl' fontWeight='500' color='GrayText'>
						Product not found
					</Text>
				</Flex>
			</MainLayout>
		);
	}

	const stars = 4.7;

	return (
		<MainLayout>
			<Flex justify='space-between' align='center'>
				<Text as='span' fontWeight='500' fontSize='lg'>
					Subastador
				</Text>
				<Flex align='center' gap={2}>
					<Text as='span' fontWeight='700' fontSize='md'>
						{stars}
					</Text>
					<Flex>
						{[...Array(5)].map((_, i) => (
							<Icon
								key={i}
								name={
									i + 1 <= stars
										? 'star'
										: i + 1 <= stars + 0.5
										? 'star_half'
										: 'star_border'
								}
							/>
						))}
					</Flex>
				</Flex>
			</Flex>
			<Box>a</Box>
			<Box>a</Box>
			<Box>a</Box>
			<Box>a</Box>
		</MainLayout>
	);
};

export default ProductScreen;

export const getServerSideProps: GetServerSideProps = async context => {
	const id = (context.query.id as string).split('-')[0];
	const productName = (context.query.id as string)
		.split('-')
		.slice(1)
		.join('-');
	const res = await fetch(
		`http://localhost:3000/api/placeholder/products/${id}`,
	);

	const product = (await res.json()) as IProduct;

	if (!res.ok || sanityRoute(product.name) !== productName) {
		context.res.statusCode = 404;

		return {
			props: {
				product: null,
			},
		};
	}

	return {
		props: {
			product,
		},
	};
};
