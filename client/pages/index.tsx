import {
	Box,
	Button,
	Flex,
	Stack,
	Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';

interface Props {
	products: Product[] | null;
}

interface Product {
	name: string;
	currentBid: number;
}

const Home: NextPage<Props> = ({ products }) => {
	return (
		<Box pos='fixed' w='100vw' h='100vh' bg='#EEE'>
			<Flex as='nav' bg='blue.200' justify='center' mb={3}>
				<Flex w='full' maxW='1024px' justify='space-between'>
					<Button rounded="none" cursor="pointer" colorScheme='blue'>Cuenta</Button>
					<Button rounded="none" cursor="pointer" colorScheme='blue'>100</Button>
				</Flex>
			</Flex>

			<Flex
				gap={3}
				overflow='auto'
				css={{
					'::-webkit-scrollbar': { display: 'none' },
				}}
			>
				{products &&
					products.map(product => (
						<Stack
							key={product.name}
							shadow='md'
							rounded='md'
							padding={2}
							margin={2}
							width='min-content'
							gap={2}
							bg='white'
							justify='space-between'
						>
							<Flex direction='column'>
								<Box
									mx='auto'
									w='200px'
									h='200px'
									overflow='hidden'
									rounded='sm'
									mb={3}
								>
									<Image
										src='/placeholder.jpeg'
										alt={product.name}
										width={200}
										height={200}
										layout='fixed'
									/>
								</Box>

								<Text mt={0} fontWeight='bold' fontSize='xl'>
									{product.name}
								</Text>
							</Flex>
							<Flex direction='column'>
								<Text color='GrayText'>Puja actual</Text>
								<Text fontWeight='bold' fontSize='lg'>
									$ {product.currentBid}
								</Text>
							</Flex>
						</Stack>
					))}
			</Flex>
		</Box>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const products: Product[] = [
		{
			name: 'PS5 Spiderman edition',
			currentBid: 1400,
		},
		{
			name: 'Tickets BadBunny',
			currentBid: 800,
		},
		{
			name: 'Tenis Yeeze 300 Boost',
			currentBid: 400,
		},
		{
			name: 'Xbox Series S',
			currentBid: 720,
		},
		{
			name: 'RTX 3080ti',
			currentBid: 1320,
		},
		{
			name: 'Charizard Pokemon Card',
			currentBid: 22000,
		},
	];

	return {
		props: {
			products,
		},
	};
};
