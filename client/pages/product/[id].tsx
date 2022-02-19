import { Box, Button, Flex, Grid, IconButton, Text } from '@chakra-ui/react';
import Icon from '@components/Icon';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { CenterTransform } from '@chackra/center';
import NextImage from '@chackra/NextImage';
import MainLayout from '@layouts/Main';
import { IProduct } from '@typings/product';
import { sanityRoute } from '@utils/route';

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
			<Flex px={6} justify='space-between' align='center'>
				<Text as='span' fontWeight='500' fontSize='lg'>
					Subastador
				</Text>
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
			<Box mt={4} mx={3}>
				<Box px={4} pb={3}>
					<Text fontSize='xl' fontWeight='600'>
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
						Mollit consequat in nostrud labore ad ipsum minim officia duis ad
						consectetur. Nostrud est officia eiusmod nostrud amet irure. Non
						ipsum deserunt quis officia dolor fugiat dolore sunt. Irure amet
						mollit enim dolore. Ullamco magna laborum esse fugiat dolor id non
						consectetur qui. Do nulla et aute pariatur excepteur deserunt id
						commodo ut eiusmod dolore consequat esse incididunt. Exercitation
						exercitation non ex labore enim ex in non veniam ex reprehenderit
						aliquip. Anim incididunt ut magna eu reprehenderit pariatur sint ea
						consectetur nostrud nulla. Veniam ipsum non in quis in incididunt
						non eiusmod velit commodo eu velit cillum. Cillum nostrud aute ut
						aute. Ea fugiat laboris nostrud officia pariatur cillum sint culpa
						<Flex mt={2} align='center' gap='1ch' color='brand.blue'>
							<Icon name='task_alt' lineHeight='1.24' /> Producto en buen estado
						</Flex>
					</Box>
				</Box>
				<Box>
					{/* TODO: GITHUB PROJECT: View Product */}
				</Box>
			</Box>
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
