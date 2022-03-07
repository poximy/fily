import { Box, Button, Flex, Grid, IconButton, Text } from '@chakra-ui/react';
import Icon from '@components/Icon';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { CenterTransform } from '@chackra/center';
import NextImage from '@chackra/NextImage';
import MainLayout from '@layouts/Main';
import { sanityRoute } from '@utils/route';
import ProductCard from '@components/product/ProductCard';
import { Product, User } from '@prisma/client';
import { IProduct } from '@app/typings/product';
import { useRouter } from 'next/router';

interface ProductScreenProps {
	product: (Product & { User: User }) | null;
}

const ProductScreen: NextPage<ProductScreenProps> = ({ product }) => {
	const router = useRouter();

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

	const stars =
		typeof product.User.reputation !== 'number'
			? 0
			: parseFloat(((product.User.reputation / 100) * 5).toFixed(2));

	return (
		<MainLayout>
			<Flex mt={2} px={6} justify='space-between' align='center'>
				<Flex align='center'>
					<IconButton
						variant='ghost'
						onClick={() => router.back()}
						icon={<Box lineHeight='1'>{'<'}</Box>}
						aria-label='Go back'
					/>
					<Text as='span' fontWeight='500' fontSize='lg'>
						{product.User.nickname}
					</Text>
				</Flex>
				<Flex align='center' gap={2}>
					<Text
						fontFamily="'Source Code Pro'"
						as='span'
						fontWeight='700'
						fontSize='xl'
					>
						{stars}
					</Text>
					<Flex>
						{[...Array(5)].map((_, i) => (
							<Icon
								key={i}
								color='yellow.400'
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
			<Box mt={2} mx={3}>
				<Box px={4} pb={3}>
					<Text fontSize='2xl' fontWeight='600'>
						{product.name}
					</Text>
				</Box>
				<Box>
					<Box
						pos='relative'
						width='100%'
						height='20rem'
						rounded='lg'
						overflow='hidden'
					>
						<NextImage
							src='/placeholder.jpeg'
							alt={product.name + ' image'}
							layout='fill'
							objectFit='cover'
						/>
						<IconButton
							pos='absolute'
							top={2}
							right={2}
							opacity='0.7'
							aria-label='Share post'
							rounded='full'
							bg='gray.200'
							_hover={{
								bg: 'gray.100',
							}}
							icon={<CenterTransform as={Icon} color='gray' name='share' />}
						/>
					</Box>
				</Box>
				<Flex mt={2} px={4} justify='space-between' align='center'>
					<Box>
						<Text fontSize='lg' fontWeight='500'>
							Ultima venta:{' '}
							<Text
								fontFamily="'Source Code Pro'"
								as='span'
								// color='black'
								// bg='neutral.300'
								px={1}
								py={1}
								fontWeight='bold'
								fontSize='xl'
							>
								{'$' + product.currentBid}
							</Text>
						</Text>
					</Box>
					<Button leftIcon={<Icon name='visibility' />} variant='ghost'>
						Seguir
					</Button>
				</Flex>
				<Grid
					mt={2}
					px={2}
					gap={2}
					templateColumns={{
						base: '1fr',
						sm: 'repeat(2, 1fr)',
					}}
					justifyItems='center'
					alignItems='center'
				>
					<Button
						width='100%'
						bg='brand.blue'
						color='white'
						px={8}
						py={8}
						_hover={{ bg: 'brandBlue.600' }}
					>
						Comprar por $ {product.currentBid}
					</Button>
					<Button
						width='100%'
						bg='brand.orange'
						color='white'
						px={8}
						py={8}
						_hover={{ bg: 'brandOrange.600' }}
					>
						Hacer nueva oferta
					</Button>
				</Grid>
				<Box px={4} mt={9}>
					<Box
						pl={2}
						py={2}
						borderLeft='solid 3px'
						borderLeftColor='brand.orange'
					>
						<Text color='brand.orange' fontSize='xl' fontWeight='600'>
							Detalles del producto
						</Text>
					</Box>

					<Box px={4} py={2}>
						{product.description.split('\n').map((line, i) => (
							<Text key={i}>{line}</Text>
						))}
						<Flex mt={2} align='center' gap='1ch' color='brand.blue'>
							<Icon name='task_alt' lineHeight='1.24' /> Producto en buen estado
						</Flex>
					</Box>
				</Box>
				<Box px={4} mt={3} mb={4}>
					<Box
						pl={2}
						py={2}
						borderLeft='solid 3px'
						borderLeftColor='brand.green'
					>
						<Text color='brand.green' fontSize='xl' fontWeight='600'>
							Productos relacionados
						</Text>
					</Box>

					<Flex direction='column' gap={3} mt={4} mx={2}>
						{(
							[
								{ id: 0, name: 'A', currentBid: 100, category: 'tech' },
								{ id: 0, name: 'B', currentBid: 200, category: 'tech' },
								{ id: 0, name: 'C', currentBid: 300, category: 'tech' },
								{ id: 0, name: 'E', currentBid: 400, category: 'tech' },
								{ id: 0, name: 'F', currentBid: 500, category: 'tech' },
							] as IProduct[]
						).map((product, index) => (
							<ProductCard
								key={index}
								name={product.name}
								currentBid={product.currentBid}
							/>
						))}
					</Flex>
				</Box>
			</Box>
		</MainLayout>
	);
};

export default ProductScreen;

export const getServerSideProps: GetServerSideProps = async context => {
	const id = context.query.id as string | undefined;
	const productName = context.query.slugh as string;

	if (typeof id !== 'string') {
		context.res.statusCode = 404;

		return {
			props: {
				product: null,
			},
		};
	}

	const product = await prisma.product.findUnique({
		where: {
			id,
		},
		include: {
			User: {
				select: {
					id: true,
					nickname: true,
					reputation: true,
				},
			},
		},
	});

	if (!product || sanityRoute(product.name) !== productName) {
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
